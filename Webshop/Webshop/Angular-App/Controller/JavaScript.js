
var app = angular.module('app', ['ui.router', 'ngSanitize', 'cacheBuster']);
var Callbacks = 0;
var order_id = 0;
var customer_postal_code = 35250; // "" som default
var releaseVersion = "20170207"


app.filter("mydate", function () {
    var re = /\/Date\(([0-9]*)\)\//;
    return function (x) {
        var m = x.match(re);
        if (m) return new Date(parseInt(m[1]));
        else return null;
    };
});

app.filter('slice', function () {
    return function (arr, start, end) {
        return (arr || []).slice(start, end);
    };
});

app.controller('StartController',
    function ($scope, $http, $sce, $interval, $filter, $window, srv) {
        $scope.payment = 15; // Klarna som standard
        $scope.releaseVersion = releaseVersion;
        $scope.zip_code = null;
        $scope.step_counter = false;
        $scope.carriers_methods = {};
        $scope.carriers_locations = {};
        $scope.carriers_dates = {};
        $scope.carriers_times = {};
        $scope.carriers_contact_me = {};
        $scope.currentSelectedCarrier = "";

        $scope.selected_shipping_carrier = {};
        $scope.selected_shipping_method = {};
        $scope.selected_joint_delivery = [];
        $scope.selected_shipping_location = {};
        $scope.selected_shipping_date = {};
        $scope.selected_shipping_latest_date = {};
        $scope.selected_shipping_penalty_date = {}; $scope.selected_shipping_latest_date = {};
        $scope.selected_shipping_penalty_date = {};
        $scope.selected_shipping_date_object = {};
        $scope.selected_shipping_friendly_date = {};
        $scope.selected_shipping_time = {};
        $scope.selected_shipping_contact_me = {};
        $scope.selected_shipping_part_delivery = null;

        $scope.ProductQuantity = {};

        $scope.fastest_delivery_in_days = null;

        $scope.show_more_home_deliveries = {};
        $scope.contact_me_model = {};
        $scope.selected_date_time_picker = {};

        // Kan dessa tas bort?
        $scope.delivery_methods = [];
        $scope.carrier_and_method = {};

        $scope.home_deliveries_dates = [];
        $scope.pickups_dates = [];

        $scope.delivery_category = {};
        $scope.select_joint_delivery = {};
        $scope.select_pickup_deliveries_dates = {};

        $scope.PickupDeliveryLocations = {};
        $scope.PickupDeliveryLocationsDates = {};

        $scope.CascadingDeliveryLocations = {};

        $scope.list_grouper_type = "";

        $scope.GetDeliveryDates = function (carrier, part_delivery_id, defaultDates) {
            if (carrier === 'citygross') {
                if ($scope.selected_shipping_date_object[part_delivery_id] != null) {
                    var dates = new Array();
                    dates.push($scope.selected_shipping_date_object[part_delivery_id]);
                    $scope.selected_shipping_friendly_date[part_delivery_id]
                    return dates;
                }
            }
            return defaultDates;
        }

        $scope.ScrollTo = function (Object) {
            $('html,body').animate({ scrollTop: $(Object).offset().top }, 'slow');
        }

        $scope.ListGrouper = function (list_grouper_type, deliveries, index) {

            if ((deliveries == null || deliveries.length == 1) && index == 0) {
                $scope.list_grouper_type = list_grouper_type;
                return true;
            } else if (deliveries != null && deliveries.length > 1) {
                if (list_grouper_type != $scope.list_grouper_type && list_grouper_type != 'no_delivery') {
                    $scope.list_grouper_type = list_grouper_type;
                    return true;
                } else {
                    $scope.list_grouper_type = list_grouper_type;
                    return false;
                }
            }
        }

        $scope.OpenModal = function (Id) {
            $("#" + Id).addClass("modal-show");
            $("<div class='modal-overlay js-alertmodal-overlay'></div>").appendTo("body").fadeIn(300);
            if ($(window).width() < 640) {
                $("html, body").animate({ scrollTop: 0 }, 300);
            }
        }

        $scope.OpenCampainModal = function (Id) {
            $scope.OpenModal('kampanjkod');
        }

        $scope.CloseModal = function () {
            $(".modal.modal-show").removeClass("modal-show");
            $(".modal-overlay").remove();
        }

        $scope.ShowDeliveyOptions = function () {
            $(".js-deliveries").show();
            // $('html, body').animate({
            //	scrollTop: $(".js-deliveries").offset().top
            //}, 500);
        }

        $scope.CascadingDeliverySelects = function (Object, Type, Id) {
            if (Type == "DeliveryDate")
                $scope.carriers_dates[Id] = Object;
            else if (Type == "DeliveryLocation")
                $scope.carriers_locations[Id] = Object;
            else if (Type == "DeliveryTime")
                $scope.carriers_times[Id] = Object;

            $scope.GetCart();
        }

        $scope.DaysBetween = function getDaysBetweenDates(d1) {

            var msPerDay = 8.64e7;

            // Copy dates so don't mess them up
            var x0 = new Date('2017-02-07');
            var x1 = new Date(d1);

            // Set to noon - avoid DST errors
            x0.setHours(12, 0, 0);
            x1.setHours(12, 0, 0);

            // Round to remove daylight saving errors
            return Math.round((x1 - x0) / msPerDay);
        }

        $scope.ClearDeliveryScope = function (event) {
            if (!EventObject.hasClass("selected")) {
                $scope.carriers_locations = {}
                $scope.carriers_dates = {}
                $scope.carriers_locations = {}
                $scope.carriers_times = {}
            }
            EventObject.find("input[name='shipping']").prop('checked', true)
            $scope.SetShippingMethod();
            $scope.ReloadKlarna();
        }

        $scope.UpdateJointDelivery = function (selected_delivery, part_delivery_id) {

            // console.log("selected_delivery " + selected_delivery);
            // console.log("part_delivery_id " + part_delivery_id);

            $scope.selected_shipping_carrier[part_delivery_id] = selected_delivery["carrier"];
            $scope.selected_shipping_method[part_delivery_id] = selected_delivery["method"];
            $scope.selected_joint_delivery[part_delivery_id] = true;
            $scope.selected_shipping_location[part_delivery_id] = selected_delivery["location"];
            $scope.selected_shipping_contact_me[part_delivery_id] = selected_delivery["contact_me"];
            $scope.selected_shipping_date[part_delivery_id] = selected_delivery["date"];


            $scope.selected_shipping_time[part_delivery_id] = selected_delivery["time"];

            // console.log("$scope.selected_shipping_carrier " + $scope.selected_shipping_carrier[part_delivery_id]);

            $scope.GetCart();
        }

        $scope.UpdatePickupDelivery = function (selected_delivery, part_delivery_id) {
            $scope.selected_shipping_carrier[part_delivery_id] = selected_delivery["carrier"];
            $scope.selected_shipping_method[part_delivery_id] = "pickup";
            $scope.selected_joint_delivery[part_delivery_id] = false;
            $scope.selected_shipping_location[part_delivery_id] = selected_delivery["location"];
            $scope.selected_shipping_contact_me[part_delivery_id] = selected_delivery["contact_me"];
            $scope.selected_shipping_date[part_delivery_id] = selected_delivery["date"];
            $scope.selected_shipping_time[part_delivery_id] = selected_delivery["time"];

            $scope.GetCart();
        }


        $scope.SetDeliveryType = function (type, part_delivery_id, autoselect) {
            //$(".co-delivery-radio[data-target='" + type + "']").find("[name='delivery-type']").prop('checked', true);
            //$(".co-delevery-body").hide();
            //$("#" + type).show();

            if (type == 'home-delivery') {
                $scope.selected_shipping_carrier[part_delivery_id] = "jetpak";
                $scope.selected_shipping_method[part_delivery_id] = "home-delivery";
                $scope.selected_joint_delivery[part_delivery_id] = false;
                $scope.selected_shipping_location[part_delivery_id] = "home";
                $scope.selected_shipping_contact_me[part_delivery_id] = false;
                $scope.selected_shipping_date[part_delivery_id] = autoselect.date;
                $scope
                    .selected_shipping_time[part_delivery_id] =
                    $scope.timeFunction(autoselect.delivery_times[0].from).substring(0, 5) +
                    ' - ' +
                    $scope.timeFunction(autoselect.delivery_times[0].to).substring(0, 5);
            } else if (type == 'pickup') {
                $scope.selected_shipping_carrier[part_delivery_id] = "jetpak";
                $scope.selected_shipping_method[part_delivery_id] = "pickup";
                $scope.selected_joint_delivery[part_delivery_id] = false;
                $scope.currentSelectedCarrier = "jetpak";
                //$scope.selected_shipping_location[part_delivery_id] = "";
                // $scope.selected_shipping_date[part_delivery_id] = null;
                //$scope.selected_shipping_contact_me[part_delivery_id] = false;
            } else if (type == 'joint-delivery') {
                $scope.selected_shipping_carrier[part_delivery_id] = autoselect.carrier;
                $scope.selected_shipping_method[part_delivery_id] = autoselect.method;
                $scope.selected_joint_delivery[part_delivery_id] = true;
                $scope.selected_shipping_location[part_delivery_id] = autoselect.location;
                $scope.selected_shipping_contact_me[part_delivery_id] = autoselect.contact_me_for_delivery;
                $scope.selected_shipping_date[part_delivery_id] = null;
                $scope.selected_shipping_time[part_delivery_id] = autoselect.time;
            }

            $scope.GetCart();
        }

        $scope.SetHomeDeliveryDateAndTime = function (date, time, part_delivery_id) {
            $scope.selected_shipping_date[part_delivery_id] = date;
            $scope.selected_shipping_time[part_delivery_id] = time;

            $scope.GetCart();
        }

        $scope.PickupDeliveryLocationsDescription = {};

        $scope.SetPickupDeliveryLocations = function (selected_delivery, part_delivery_id) {
            $scope.PickupDeliveryLocationsDescription = $sce.trustAsHtml(selected_delivery["description"]);
            //				$scope.selected_shipping_date[part_delivery_id] = selected_delivery.delivery_dates[0].date;
            $scope.selected_shipping_location[part_delivery_id] = selected_delivery["id"];
            $scope.GetCart();
        }

        $scope.SetPickupDeliveryLocationsDates = function (selected_date, part_delivery_id) {
            //$scope.selected_shipping_date[part_delivery_id] = selected_date["date"];
            $scope.selected_shipping_date[part_delivery_id] = selected_date["date"];
            $scope.selected_shipping_friendly_date[part_delivery_id] = selected_date["friendly_name"];
            $scope.selected_shipping_date_object[part_delivery_id] = selected_date;

            var latest_date = new Date(selected_date["date"]);
            var penalty_date = new Date(selected_date["date"]);
            latest_date.setDate(latest_date.getDate() + 14);
            penalty_date.setDate(penalty_date.getDate() + 15);
            $scope.selected_shipping_latest_date[part_delivery_id] = latest_date.toISOString().substring(0, 10);;
            $scope.selected_shipping_penalty_date[part_delivery_id] = penalty_date.toISOString().substring(0, 10);

            //$scope.selected_shipping_latest_pickup_date[part_delivery_id] = selected_delivery["date"];
            $scope.GetCart();
        }

        $scope.SetPickupLocationDateTime = function (carrier, location, date, time, part_delivery_id) {
            $scope.CascadingDeliveryLocations = carrier;
            $scope.selected_shipping_carrier[part_delivery_id] = carrier;
            $scope.selected_shipping_location[part_delivery_id] = location;
            $scope.selected_shipping_time[part_delivery_id] = time;
            $scope.selected_shipping_date_object[part_delivery_id] = null;
            var latest_date = new Date(date["date"]);
            var penalty_date = new Date(date["date"]);
            latest_date.setDate(latest_date.getDate() + 14);
            penalty_date.setDate(penalty_date.getDate() + 15);
            $scope.selected_shipping_latest_date[part_delivery_id] = latest_date.toISOString().substring(0, 10);;
            $scope.selected_shipping_penalty_date[part_delivery_id] = penalty_date.toISOString().substring(0, 10);

            if (carrier == 'citygross') {
                $scope.selected_shipping_friendly_date[part_delivery_id] = null;
                $scope.selected_shipping_date[part_delivery_id] = null;
            } else {
                $scope.selected_shipping_date[part_delivery_id] = date['date'];
            }
            $scope.currentSelectedCarrier = carrier;
            $scope.GetCart();
        }

        $scope.SetContactMe = function (contact_me_model, part_delivery_id) {
            // $scope.selected_shipping_date[part_delivery_id] = null;
            // $scope.selected_shipping_time[part_delivery_id] = null;
            $scope.selected_shipping_contact_me[part_delivery_id] = contact_me_model;
            $scope.GetCart();

            $scope.ScrollTo("#deliveries");
        }

        $scope.AutoSelectDelivery = function () {
            //console.log("auto-start");
            //console.log($scope.selected_shipping_carrier);
            //console.log($scope.selected_shipping_part_delivery);
            //console.log($scope.deliveries);
            //console.log($scope.deliveries.length);
            //console.log(Object.keys($scope.selected_shipping_carrier).length);

            //console.log($scope.selected_shipping_carrier);
            //console.log($scope.selected_shipping_method);
            //console.log($scope.selected_joint_delivery);
            //console.log($scope.selected_shipping_location);
            //console.log($scope.selected_shipping_contact_me);
            //console.log($scope.selected_shipping_date);
            //console.log($scope.selected_shipping_part_delivery);
            //console.log($scope.selected_shipping_time);

            if ($scope.messages != null &&
                $filter('filter')($scope.messages, { type_key: 'part_delivery' }, true).length > 0) {
                $scope.SetPartDelivery(false);
            } else if (($scope.selected_shipping_part_delivery != null ||
                    ($scope.selected_shipping_part_delivery == null && ($scope.deliveries != null))) &&
                ($scope
                    .selected_shipping_carrier ==
                    null ||
                    Object.keys($scope.selected_shipping_carrier).length == 0)) {
                angular.forEach($scope.deliveries,
                    function (deliveries) {
                        //console.log("auto-run");
                        var selectedCarrier = 0;
                        if (deliveries.carriers[0].id == "citygross" &&
                           deliveries.carriers[0].delivery_methods[0].id == "pickup") {
                            selectedCarrier = 1;
                        }
                        var auto_carrier = deliveries.carriers[selectedCarrier].id;
                        var auto_method = deliveries.carriers[selectedCarrier].delivery_methods[0].id;
                        var auto_location = deliveries.carriers[selectedCarrier].delivery_methods[0].delivery_locations[0].id;
                        if (deliveries.carriers[selectedCarrier].id == 'citygross')
                            auto_location = null;



                        var auto_date = null;
                        var auto_time = null;

                        if (auto_location != null &&
                            deliveries.carriers[selectedCarrier].delivery_methods[0].delivery_locations[0].delivery_dates
                            .length >
                            0)
                            auto_date = deliveries.carriers[selectedCarrier].delivery_methods[0].delivery_locations[0]
                                .delivery_dates[0].date;

                        if (auto_location != null &&
                            deliveries.carriers[selectedCarrier].delivery_methods[0].delivery_locations[0].delivery_dates
                            .length >
                            0 &&
                            deliveries.carriers[selectedCarrier].delivery_methods[0].delivery_locations[0].delivery_dates[0]
                            .delivery_times != null)
                            auto_time = $scope
                                .timeFunction(deliveries.carriers[selectedCarrier].delivery_methods[0].delivery_locations[0]
                                    .delivery_dates[0].delivery_times[0].from)
                                .substring(0, 5) +
                                ' - ' +
                                $scope.timeFunction(deliveries.carriers[selectedCarrier].delivery_methods[0].delivery_locations[0]
                                    .delivery_dates[0].delivery_times[0].to)
                                .substring(0, 5);

                        if (deliveries.carriers[selectedCarrier].id == 'citygross')
                            auto_date = null;


                        $scope.selected_shipping_carrier[deliveries.id] = auto_carrier;
                        $scope.selected_shipping_method[deliveries.id] = auto_method;
                        $scope.selected_joint_delivery[deliveries.id] = false;
                        $scope.selected_shipping_location[deliveries.id] = auto_location;
                        $scope.selected_shipping_contact_me[deliveries.id] = false;
                        $scope.selected_shipping_date[deliveries.id] = auto_date;
                        $scope.selected_shipping_part_delivery = $scope.selected_shipping_part_delivery;
                        $scope.selected_shipping_time[deliveries.id] = auto_time;
                    });

                // console.log("auto-getCart");
                $scope.GetCart();
                // console.log("auto-end-getCart");
            }

            //console.log($scope.selected_shipping_carrier);
            //console.log($scope.selected_shipping_method);
            //console.log($scope.selected_joint_delivery);
            //console.log($scope.selected_shipping_location);
            //console.log($scope.selected_shipping_contact_me);
            //console.log($scope.selected_shipping_date);
            //console.log($scope.selected_shipping_part_delivery);
            //console.log($scope.selected_shipping_time);
            //console.log("auto-end");
        }


        $scope.SetShippingMethod = function () {

            $scope.carrier_and_method = [];
            angular.forEach($scope.deliveries,
                function (delivery) {
                    var SelectedShippingMethod = eval('({ "carrier": ' +
                        (($scope.selected_shipping_carrier[delivery.id] == null ||
                                $scope.selected_shipping_carrier[delivery.id] == undefined)
                            ? $scope.selected_shipping_carrier[delivery.id]
                            : '"' + $scope.selected_shipping_carrier[delivery.id] + '"') +
                        '})');
                    SelectedShippingMethod["method"] = $scope.selected_shipping_method[delivery.id];
                    SelectedShippingMethod["joint_delivery"] = $scope.selected_joint_delivery[delivery.id];
                    SelectedShippingMethod["location"] = $scope.selected_shipping_location[delivery.id];
                    SelectedShippingMethod["date"] = $scope.selected_shipping_date[delivery.id];
                    SelectedShippingMethod["time"] = $scope.selected_shipping_time[delivery.id];
                    SelectedShippingMethod["contact_me_for_delivery"] = $scope.selected_shipping_contact_me[
                        delivery.id];
                    SelectedShippingMethod["part_delivery"] = $scope.selected_shipping_part_delivery;

                    $scope.carrier_and_method.push(SelectedShippingMethod);
                    // console.log($scope.carrier_and_method);
                });
        }

        $scope.timeFunction = function (timeObj) {
            var min = timeObj.Minutes < 10 ? "0" + timeObj.Minutes : timeObj.Minutes;
            var sec = timeObj.Seconds < 10 ? "0" + timeObj.Seconds : timeObj.Seconds;
            var hour = timeObj.Hours < 10 ? "0" + timeObj.Hours : timeObj.Hours;
            return hour + ':' + min + ':' + sec;
        };

        $scope.SetZipCode = function (data, provider) {
            if (data.length == 5) {
                zip_provider = provider;
                $scope.zip_code = data;
                //console.log(zip);
                //console.log(data);
                if (zip != null && zip != '' && (zip != data)) {
                    // console.log("open zip modal");
                    $scope.OpenModal('change_zip_code');
                    $scope.fastest_delivery_in_days = null;
                    angular.forEach($scope.deliveries,
                        function (delivery) {
                            //$scope.selected_shipping_carrier[delivery.id] = null;
                            //$scope.selected_shipping_method[delivery.id] = null;
                            //$scope.selected_joint_delivery[delivery.id] = false;
                            //$scope.selected_shipping_location[delivery.id] = null;
                            //$scope.selected_shipping_date[delivery.id] = null;
                            //$scope.selected_shipping_time[delivery.id] = null;
                            //$scope.selected_shipping_contact_me[delivery.id] = false;

                            $scope.selected_shipping_carrier = {};
                            $scope.selected_shipping_method = {};
                            $scope.selected_joint_delivery = [];
                            $scope.selected_shipping_location = {};
                            $scope.selected_shipping_date = {};
                            $scope.selected_shipping_time = {};
                            $scope.selected_shipping_contact_me = {};
                            // $scope.selected_shipping_part_delivery = null;
                            // $scope.selected_shipping_part_delivery = null;
                        });
                }
                zip = data;
                $scope.GetCart();
            }
        };

        var zip_provider = null;
        var zip = null;

        var interval = $interval(function () {
            if (typeof window._klarnaCheckout != "undefined") {
                window._klarnaCheckout(function (api) {
                    api.on({
                        'change': function (data) {
                            //console.log("change ");
                            //console.log(data);
                            if (zip_provider == null || zip_provider == 'address')
                                $scope.SetZipCode(data.postal_code.replace(/[^0-9.]/g, ""), 'address');
                        }
                    });
                    api.on({
                        'shipping_address_change': function (data) {
                            //console.log("shipping_address_change ");
                            //console.log(data);
                            if (zip_provider == null || zip_provider == 'shipping' || zip_provider == 'address')
                                $scope.SetZipCode(data.postal_code.replace(/[^0-9.]/g, ""), 'shipping');
                        }
                    });
                });
                $interval.cancel(interval);
            }
        },
                300);

        $scope.ReloadKlarna = function () {
            window._klarnaCheckout(function (api) {
                api.suspend();
            });
            srv({
                method: 'POST',
                url: '/Cart.aspx/ReloadKlarna',
                crossDomain: true,
                data: {
                    OrderId: order_id,
                    CartId: '20170206145838704',
                    CustomerId:
                        null,
                    ZipCode: $scope.zip_code,
                    DeliveryAddressId: 211,
                    ShippingType: $scope.carrier_and_method,
                    PaymentType: $scope.payment
                }
            })
                .then(function (response) {
                    window._klarnaCheckout(function (api) {
                        api.resume();
                    });
                });
        }

        $scope.RenderKlarna = function () {
            srv({
                method: 'POST',
                url: '/Cart.aspx/RenderKlarna',
                crossDomain: true,
                data: {
                    CartId: '20170206145838704',
                    CustomerId:
                        null,
                    ZipCode: $scope.zip_code,
                    DeliveryAddressId: 211,
                    ShippingType: $scope.carrier_and_method,
                    PaymentType: $scope.payment
                }
            })
                .then(function (response) {
                    response = response.data;
                    var interval_klarna_render = $interval(function () {
                        if ($("#klarna").length > 0) {
                            $("#klarna").html(response.d.snippet);
                            $interval.cancel(interval_klarna_render);
                        }
                    },
                                300);

                    order_id = response.d.order_id;
                });
        }

        $scope.UpdateCart = function (adjust, event, Quantity, Id, Type, CurrentQuantity) {
            $(event.currentTarget).parent().addClass("section-loading");

            if (Type == 'Set') {
                if ($(event.currentTarget) != null && $(event.currentTarget).val() != '')
                    Quantity = $(event.currentTarget).val();
                else
                    Quantity = 0;
            }

            console.log($(event.currentTarget).val());
            //console.log(Quantity);
            //console.log(Id);
            //console.log(Type);
            //console.log(CurrentQuantity);
            var r = true;
            if (Quantity == 0 || (Quantity + CurrentQuantity == 0)) {
                r = confirm("Du håller på att ta bort produkten");
            }

            if (r == true) {
                // section-loading
                srv({
                    method: 'POST',
                    url: '/Cart.aspx/UpdateCart',
                    crossDomain: true,
                    data: {
                        Id: Id,
                        Quantity: Quantity,
                        Type: Type
                    }
                })
                        .then(function (response) {
                            response = response.data;
                            //console.log("------");
                            //var PreviousDelivery = $scope.deliveries;
                            //console.log("PreviousDelivery" + PreviousDelivery);
                            //$scope.GetCart();
                            //var NewDelivery = $scope.deliveries;
                            //console.log("NewDelivery" + NewDelivery);
                            //console.log("------");
                            //// Om man går från delleverans till att ta bort viner med senare leverans så 0-ställs part delivery så att vi inte får med det i frakthanteringen.
                            //if ($scope.selected_shipping_part_delivery != null && $scope.selected_shipping_part_delivery == true && NewDelivery.length < 2)
                            //{
                            //	console.log("### Kör");
                            //	$scope.selected_shipping_part_delivery = null;
                            //	$scope.SetShippingMethod();
                            //	$scope.GetCart();
                            //}

                            if (!adjust && response.d.success == false) {
                                alert(response.d.description);
                            }

                            $scope.GetCart();
                        });
            } else {
                $(".co-cart--item .quantity").removeClass("section-loading");
            }
        }
        $scope.SetPartDelivery = function (Type) {
            $scope.selected_shipping_carrier = {};
            $scope.selected_shipping_part_delivery = Type;
            // $scope.CloseModal();
            $scope.GetCart();
            // $scope.AutoSelectDelivery();
        }


        $scope.GetCart = function () {
            var interval = $interval(function () {
                if (typeof window._klarnaCheckout != "undefined") {

                    window._klarnaCheckout(function (api) {
                        api.suspend();
                    });

                    // Göra om till ett generellt scope
                    $scope.SetShippingMethod();
                    // $('.js-dynamic-cart').css('opacity', 0.2);
                    // alert($scope.zip_code);
                    srv({
                        method: 'POST',
                        url: '/Cart.aspx/GetFullCart',
                        crossDomain: true,
                        data: {
                            CartId: '20170206145838704',
                            CustomerId:
                                null,
                            ZipCode: $scope.zip_code,
                            DeliveryAddressId: 211,
                            ShippingType: $scope.carrier_and_method,
                            PaymentType: $scope.payment
                        }
                    })
                            .then(function (response) {

                                // reset all loaders
                                $(".co-cart--item .quantity").removeClass("section-loading");

                                // rewriting queue response data
                                response = response.data;
                                if (response.d.total > 50000) {
                                    $window.location.href = '/sammanstallning?do=redirect';
                                    $("body")
                                        .fadeTo("slow",
                                            0.0,
                                            function () {
                                                // Animation complete.
                                            });
                                }

                                if (response.d.total == 0) {
                                    $window.location.href = '/';
                                    $("body")
                                        .fadeTo("slow",
                                            0.0,
                                            function () {
                                                // Animation complete.
                                            });
                                }

                                //console.log("start");
                                //console.log($scope.selected_shipping_part_delivery);
                                if (response.d.deliveries != null &&
                                    response.d.deliveries.length == 1 &&
                                    $scope.selected_shipping_part_delivery == true) {
                                    $scope.selected_shipping_carrier = {};
                                    $scope.selected_shipping_part_delivery = null;
                                }
                                //console.log($scope.selected_shipping_part_delivery);
                                //console.log("end");

                                $('.js-dynamic-cart').css('opacity', 1);
                                $scope.products = response.d.products;
                                $scope.total = response.d.total;
                                $scope.vat = response.d.vat;
                                $scope.total_quantity = response.d.total_quantity;
                                $scope.extras = response.d.extras;
                                $scope.discounts = response.d.discounts;
                                $scope.messages = response.d.messages;
                                // $scope.carriers = response.d.carriers;

                                $scope.deliveries = response.d.deliveries;

                                $scope.status = response.d.status;

                                $scope.delivery_methods = [];

                                $scope.home_deliveries_dates = [];
                                $scope.pickup_deliveries_dates = [];
                                $scope.pickups_dates = [];
                                $scope.carriers = [];

                                if ($scope.deliveries != null && $scope.deliveries.length > 0) {
                                    // Här visar vi hur många dagar en snabb leverans blir och sparar det så att när delivery-2 är det endas som finns med part delivery så har vi värdet i scopet.
                                    if ($scope.deliveries != null &&
                                    ($scope.fastest_delivery_in_days >= $scope.deliveries[0].minimum_delivery_days ||
                                        $scope.fastest_delivery_in_days == null))
                                        $scope.fastest_delivery_in_days = $scope.deliveries[0].minimum_delivery_days;

                                    angular.forEach($scope.deliveries,
                                        function (deliveries) {
                                            $scope.delivery_methods[deliveries.id] = [];
                                            $scope.home_deliveries_dates[deliveries.id] = [];
                                            $scope.pickup_deliveries_dates[deliveries.id] = [];
                                            $scope.carriers[deliveries.id] = [];

                                            angular.forEach(deliveries.carriers,
                                                function (carrier) {
                                                    $scope.carriers[deliveries.id].push(carrier);
                                                    angular.forEach(carrier.delivery_methods,
                                                        function (method) {
                                                            method.carrier = carrier;
                                                            $scope.delivery_methods[deliveries.id].push(method);

                                                            if (method.type == 0) {
                                                                angular
                                                                    .forEach(method.delivery_locations[0]
                                                                        .delivery_dates,
                                                                        function (date) {
                                                                            date.deliveries = deliveries;
                                                                            date.carrier = carrier;
                                                                            date.method = method;
                                                                            date.location = method.delivery_locations[
                                                                                0];
                                                                            date
                                                                                .minimum_delivery_days =
                                                                                method.delivery_locations[0]
                                                                                .minimum_delivery_days;
                                                                            $scope.home_deliveries_dates[deliveries.id
                                                                            ].push(date);
                                                                        });
                                                            }

                                                            if (method.type == 1)
                                                                angular
                                                                    .forEach(method.delivery_locations[0]
                                                                        .delivery_dates,
                                                                        function (date) {
                                                                            date.deliveries = deliveries;
                                                                            date.carrier = carrier;
                                                                            date.method = method;
                                                                            date.location = method.delivery_locations[
                                                                                0];
                                                                            date
                                                                                .minimum_delivery_days =
                                                                                method.delivery_locations[0]
                                                                                .minimum_delivery_days;
                                                                            $scope.pickup_deliveries_dates[
                                                                                deliveries.id].push(date);
                                                                        });
                                                        });
                                                });
                                        });
                                }

                                if ($scope.selected_shipping_part_delivery == null &&
                                    ($scope.deliveries != null && $scope.deliveries.length > 1)) {
                                    $("#deliveries").hide();
                                    // alert($scope.status.description);
                                    //console.log("måste välja");
                                    // $scope.OpenModal('part_delivery');
                                    // $("#part_delivery").show();
                                } else {
                                    // $("#part_delivery").hide();
                                    $("#deliveries").show();
                                }

                                if ($filter('filter')($scope.messages, { friendly_type: 'modal' }, true).length > 0) {
                                    $scope.OpenModal('message');
                                }
                                var has_all_dates = true;

                                angular.forEach($scope.deliveries,
                                    function (deliveries) {
                                        has_all_dates = has_all_dates &&
                                            $scope.selected_shipping_date[deliveries.id] != null;
                                    });

                                //$scope.deliveries.forEach(has_all_dates && $scope.selected_shipping_date[item.id] != null);

                                if (($scope.status != null && $scope.status.success == false) || !has_all_dates)
                                    $(".payment-object").hide();
                                else
                                    $(".payment-object").show();

                                if (Callbacks > 0)
                                    $scope.ReloadKlarna();

                                Callbacks += 1;
                                // console.log(response.d);

                                if ($scope.zip_code == null || $scope.zip_code.length < 5)
                                    $("#deliveries").hide();
                                else {
                                    if ($scope.selected_shipping_part_delivery == null &&
                                        ($scope.deliveries != null && $scope.deliveries.length > 1)) {
                                    } else
                                        $("#deliveries").show();
                                }


                                //if ($("#deliveries").is(':visible'))

                                $scope.step_counter = $("#deliveries").is(':visible');

                                if ($scope.deliveries != null && $scope.deliveries.length > 0) {
                                    $scope.AutoSelectDelivery();
                                }
                                window._klarnaCheckout(function (api) {
                                    api.resume();
                                });
                            });
                    $interval.cancel(interval);
                }
            },
                300);

        }

        $scope.GetCart();
        $scope.RenderKlarna();
    });

app.config(['$stateProvider', '$urlRouterProvider',
function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('start', {
            url: '/',
            controller: 'StartController',
            templateUrl: '/assets-customer/AngularPlugins/Cart/Partials/StartView.html?v=' + releaseVersion
        })
}]);

app.directive('ngLoading', ['$animate', function ($animate) {
    return function (scope, element, attrs) {

        attrs.$observe('ngLoading', function (value) {
            (value != "true" || !value) ? $animate.removeClass(element, 'section-loading') : $animate.addClass(element, 'section-loading');
        });
    };

}]);

Number.prototype.format = function (n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));
    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

app.directive('ngSlideShow', ['$animate', function ($animate) {
    return {
        link: function (scope, element, attrs) {
            attrs.$observe('ngSlideShow', function (value) {

                if (!$(element).hasClass('ng-slide-show')) {
                    $(element).addClass('ng-slide-show')
                }

                if (value == 0) {
                    $(element).removeClass('fadein').slideUp(300);
                } else if (value > 0) {
                    if (!$(element).hasClass('fadein'))
                        $(element).slideDown(300).addClass('fadein');
                }
            });
        }
    };
}]);

app.factory('srv', function ($q, $http) {

    var queue = [];
    var execNext = function () {
        var task = queue[0];
        $http(task.c).then(function (data) {
            queue.shift();
            task.d.resolve(data);
            if (queue.length > 0) execNext();
        }, function (err) {
            queue.shift();
            task.d.reject(err);
            if (queue.length > 0) execNext();
        })
        ;
    };
    return function (config) {
        var d = $q.defer();
        queue.push({ c: config, d: d });
        if (queue.length === 1) execNext();
        return d.promise;
    };
});

app.run(
    ['$rootScope', '$state', '$stateParams',
      function ($rootScope, $state, $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
      }
    ]);

