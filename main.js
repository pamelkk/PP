//<!--
/* <![CDATA[ (head-active_data.js) */
var dw = (window.dw || {});
dw.ac = {
    _analytics: null,
    _events: [],
    _category: "",
    _searchData: "",
    _anact: "",
    _anact_nohit_tag: "",
    _analytics_enabled: "true",
    _timeZone: "Europe/Zurich",
    _capture: function (configs) {
        if (Object.prototype.toString.call(configs) === "[object Array]") {
            configs.forEach(captureObject);
            return;
        }
        dw.ac._events.push(configs);
    },
    capture: function () {
        dw.ac._capture(arguments);
        // send to CQ as well:
        if (window.CQuotient) {
            window.CQuotient.trackEventsFromAC(arguments);
        }
    },
    EV_PRD_SEARCHHIT: "searchhit",
    EV_PRD_DETAIL: "detail",
    EV_PRD_RECOMMENDATION: "recommendation",
    EV_PRD_SETPRODUCT: "setproduct",
    applyContext: function (context) {
        if (typeof context === "object" && context.hasOwnProperty("category")) {
            dw.ac._category = context.category;
        }
        if (typeof context === "object" && context.hasOwnProperty("searchData")) {
            dw.ac._searchData = context.searchData;
        }
    },
    setDWAnalytics: function (analytics) {
        dw.ac._analytics = analytics;
    },
    eventsIsEmpty: function () {
        return 0 == dw.ac._events.length;
    }
};
/* ]]> */
// -->
//<!--
/* <![CDATA[ (head-cquotient.js) */
var CQuotient = window.CQuotient = {};
CQuotient.clientId = 'bbkq-PhilippPleinEU';
CQuotient.realm = 'BBKQ';
CQuotient.siteId = 'PhilippPleinEU';
CQuotient.instanceType = 'prd';
CQuotient.locale = 'en_GB';
CQuotient.fbPixelId = '__UNKNOWN__';
CQuotient.activities = [];
CQuotient.cqcid = '';
CQuotient.cquid = '';
CQuotient.cqeid = '';
CQuotient.cqlid = '';
/* Turn this on to test against Staging Einstein */
/* CQuotient.useTest= true; */
CQuotient.initFromCookies = function () {
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf('cqcid=') == 0) {
            CQuotient.cqcid = c.substring('cqcid='.length, c.length);
        } else if (c.indexOf('cquid=') == 0) {
            var value = c.substring('cquid='.length, c.length);
            if (value) {
                var split_value = value.split("|", 3);
                if (split_value.length > 0) {
                    CQuotient.cquid = split_value[0];
                }
                if (split_value.length > 1) {
                    CQuotient.cqeid = split_value[1];
                }
                if (split_value.length > 2) {
                    CQuotient.cqlid = split_value[2];
                }
            }
        }
    }
}

let timer_show = document.getElementById("timer");
const SecondsCount = {
    SECONDS_IN_MINUTES: 60,
    SECONDS_IN_HOURS: 3600,
    SECONDS_IN_DAY: 86400,
};
 
function diffSubtract(date1, date2) {
    return date2 - date1;
}
 
let endDateInfo = {
    "full_year": "2023",
    "month": "01",
    "day": "01",
    "hours": "00",
    "minutes": "00",
    "seconds": "00"
}
const isLessTen = (time) => time < 10;

let endDateFull = `${endDateInfo.full_year}-${endDateInfo.month}-${endDateInfo.day}T${endDateInfo.hours}:${endDateInfo.minutes}:${endDateInfo.seconds}`;

timer = setInterval(function () {
    let now = new Date();
    let date = new Date(endDateFull);
    let ms_left = diffSubtract(now, date);
    if (ms_left <= 0) {
        clearInterval(timer);
        alert("Время вышло!");
    } else {
        const secDuration = Math.trunc(ms_left/1000);
        let days = null;
        let hours = null;
        let minutes = null;
        let seconds = null;
        let time = '';

        if(secDuration < SecondsCount.SECONDS_IN_MINUTES) {
            seconds = secDuration;
            time = `00 : 00 : 00 : ${seconds < 10 ? '0' + seconds : seconds}`;
        }
        if(secDuration >= SecondsCount.SECONDS_IN_MINUTES && secDuration < SecondsCount.SECONDS_IN_HOURS) {
            minutes = Math.trunc(secDuration / SecondsCount.SECONDS_IN_MINUTES);
            seconds = Math.trunc(secDuration % SecondsCount.SECONDS_IN_MINUTES);
      
            time = `00 : 00 : ${minutes < 10 ? '0' + minutes : minutes} : ${seconds < 10 ? '0' + seconds : seconds}`;
        }
        if(secDuration >= SecondsCount.SECONDS_IN_HOURS && secDuration < SecondsCount.SECONDS_IN_DAY) {
            hours = Math.trunc(secDuration / SecondsCount.SECONDS_IN_HOURS);
            minutes = Math.trunc((secDuration % SecondsCount.SECONDS_IN_HOURS)/SecondsCount.SECONDS_IN_MINUTES);
            seconds = Math.trunc((secDuration % SecondsCount.SECONDS_IN_HOURS)%SecondsCount.SECONDS_IN_MINUTES);
      
            time = `00 : ${hours < 10 ? '0' + hours : hours} : ${minutes < 10 ? '0' + minutes : minutes} : ${seconds < 10 ? '0' + seconds : seconds}`;
        }
        if(secDuration >= SecondsCount.SECONDS_IN_DAY) {
            days = Math.trunc(secDuration / SecondsCount.SECONDS_IN_DAY);
            hours = Math.trunc((secDuration % SecondsCount.SECONDS_IN_DAY)/SecondsCount.SECONDS_IN_HOURS);
            minutes = Math.trunc(((secDuration % SecondsCount.SECONDS_IN_DAY)%SecondsCount.SECONDS_IN_HOURS)/SecondsCount.SECONDS_IN_MINUTES);
            seconds = Math.trunc(((secDuration % SecondsCount.SECONDS_IN_DAY)%SecondsCount.SECONDS_IN_HOURS)%SecondsCount.SECONDS_IN_MINUTES);
      
            time = `${days < 10 ? '0' + days : days} : ${hours < 10 ? '0' + hours : hours} : ${minutes < 10 ? '0' + minutes : minutes} : ${seconds < 10 ? '0' + seconds : seconds}`;
        }

        timer_show.innerHTML = time;
    }
}, 1000)

const navigationListMenu = document.querySelector(".b-main_navigation.js-utility_popup-item.js-toggled_menu.js-main_navigation");
const navigationButton = document.querySelector(".menu-toggle");
const bodyElement = document.querySelector(".js-header_fixed");

console.log(navigationListMenu)
console.log(navigationButton)

navigationButton.addEventListener('click', function () {
    navigationListMenu.classList.toggle('active')
    navigationButton.classList.toggle('active')
    if (bodyElement.classList.contains('js-header_fixed')) {
        bodyElement.classList.remove('js-header_fixed')
        bodyElement.classList.add('js-utility_opened')
        navigationListMenu.style.display = "block";
    } else {
        bodyElement.classList.add('js-header_fixed')
        bodyElement.classList.remove('js-utility_opened')
        navigationListMenu.style.display = "none";
    }
})

CQuotient.getCQCookieId = function () {
    if (window.CQuotient.cqcid == '')
        window.CQuotient.initFromCookies();
    return window.CQuotient.cqcid;
};
CQuotient.getCQUserId = function () {
    if (window.CQuotient.cquid == '')
        window.CQuotient.initFromCookies();
    return window.CQuotient.cquid;
};
CQuotient.getCQHashedEmail = function () {
    if (window.CQuotient.cqeid == '')
        window.CQuotient.initFromCookies();
    return window.CQuotient.cqeid;
};
CQuotient.getCQHashedLogin = function () {
    if (window.CQuotient.cqlid == '')
        window.CQuotient.initFromCookies();
    return window.CQuotient.cqlid;
};
CQuotient.trackEventsFromAC = function ( /* Object or Array */ events) {
    try {
        if (Object.prototype.toString.call(events) === "[object Array]") {
            events.forEach(_trackASingleCQEvent);
        } else {
            CQuotient._trackASingleCQEvent(events);
        }
    } catch (err) {}
};
CQuotient._trackASingleCQEvent = function ( /* Object */ event) {
    if (event && event.id) {
        if (event.type === dw.ac.EV_PRD_DETAIL) {
            CQuotient.trackViewProduct({
                id: '',
                alt_id: event.id,
                type: 'raw_sku'
            });
        } // not handling the other dw.ac.* events currently
    }
};
CQuotient.trackViewProduct = function ( /* Object */ cqParamData) {
    var cq_params = {};
    cq_params.cookieId = CQuotient.getCQCookieId();
    cq_params.userId = CQuotient.getCQUserId();
    cq_params.emailId = CQuotient.getCQHashedEmail();
    cq_params.loginId = CQuotient.getCQHashedLogin();
    cq_params.product = cqParamData.product;
    cq_params.realm = cqParamData.realm;
    cq_params.siteId = cqParamData.siteId;
    cq_params.instanceType = cqParamData.instanceType;
    cq_params.locale = CQuotient.locale;

    if (CQuotient.sendActivity) {
        CQuotient.sendActivity(CQuotient.clientId, 'viewProduct', cq_params);
    } else {
        CQuotient.activities.push({
            activityType: 'viewProduct',
            parameters: cq_params
        });
    }
};
/* ]]> */
// -->

var WebEmarsysSdk = WebEmarsysSdk || []
WebEmarsysSdk.push(['init', {
    applicationCode: 'EMSFB-EED17',
    safariWebsitePushID: 'web.com.plein',
    defaultNotificationTitle: 'PHILIPP PLEIN',
    defaultNotificationIcon: 'https://link.plein.com/custloads/765156245/md_1143609.svg',
    autoSubscribe: true,
    serviceWorker: {
        url: 'service-worker.js',
        applicationServerPublicKey: 'BFHVoneFzovd1B8ipIULN-AE7e20ouTIZacWldOC1o-WL3FCdGMeQgcFP2M0_RRhbY4vQOMNLvxffox83VaznZ4'
    }
}])

if (window.jQuery) {
    jQuery(document).ready(function () {
        if (screen.width < 768) {
            jQuery('#footer').append('<a href="/gb/home/" class="full-site-link">View Full Site</a>');
            jQuery('.full-site-link')
                .attr('href', '/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Home-FullSite')
                .click(function (e) {
                    e.preventDefault();
                    jQuery.ajax({
                        url: '/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Home-FullSite',
                        success: function () {
                            window.location.reload();
                        }
                    });
                });
        }
    });
}

var gtm_vars = {
    "user_id": "",
    "user_gender": "",
    "user_age": "",
    "user_category": "",
    "user_recency": "",
    "user_frequency": "",
    "user_amount": "",
    "user_email": "",
    "user_email_optin": "",
    "user_newcustomer": "1",
    "page_cat1": "",
    "page_cat2": "",
    "page_cat3": "",
    "page_cat4": "",
    "page_error": "",
    "order_id": "",
    "basket_id": "",
    "order_amount_ati_without_sf": "",
    "order_amount_ati_with_sf": "",
    "order_discount_ati": "",
    "order_ship_ati": "",
    "order_amount_tf_without_sf": "",
    "order_amount_tf_with_sf": "",
    "order_discount_tf": "",
    "order_ship_tf": "",
    "order_tax": "",
    "order_payment_methods": "",
    "order_shipping_method": "",
    "order_promo_code": "",
    "order_products_number": "",
    "order_newcustomer": "",
    "order_products": []
};

gtm_vars = gtm_vars || {};
Object.assign(gtm_vars, {
    "user_id": "",
    "user_gender": "",
    "user_age": "",
    "user_category": "",
    "user_recency": "",
    "user_frequency": "",
    "user_amount": "",
    "user_email": "",
    "user_email_optin": "",
    "user_newcustomer": "1",
    "order_id": "",
    "basket_id": "",
    "order_amount_ati_without_sf": "",
    "order_amount_ati_with_sf": "",
    "order_discount_ati": "",
    "order_ship_ati": "",
    "order_amount_tf_without_sf": "",
    "order_amount_tf_with_sf": "",
    "order_discount_tf": "",
    "order_ship_tf": "",
    "order_tax": "",
    "order_payment_methods": "",
    "order_shipping_method": "",
    "order_promo_code": "",
    "order_products_number": "",
    "order_newcustomer": "",
    "order_products": []
});

var headline = $('[data-id="top-headline"]');

const exchanged = document.querySelector('.item--exchanged');
const exchange = document.querySelector('.item--exchange-on-pickup');

if (exchanged && exchange && ['IT', 'ES', 'DE', 'NL', 'FR'].includes(document.cookie.match(
        '(^|;)\\s*selectedCountry\\s*=\\s*([^;]+)') ?.pop())) {
    exchange.style.display = 'block';
    exchanged.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    (function () {
        if (headline) {
            if (getCookieRunning()) {
                headline.remove();
                return false;
            }

            var closeHeadlineBtn = headline.find('[data-id="top-headline-close"]')
                .get(0);

            if (closeHeadlineBtn) {
                closeHeadlineBtn.addEventListener('click', () => {
                    headline.remove();
                    setCookieRunning("runningLine", "true", 30);
                });
            }

            let sliders = headline.find('[data-id="headline-slide"]');

            let count = 0;

            if (sliders.length > 1) {
                setInterval(function () {
                    sliders = headline.find('[data-id="headline-slide"]');
                    sliders[count].classList.remove('show-line');

                    if (count === sliders.length - 1) {
                        count = 0;
                        sliders[count].classList.add('show-line');
                    } else {
                        sliders[count + 1].classList.add('show-line');
                        count++;
                    }
                }, 6000);
            }
        }

        function setCookieRunning(name, value, minutes) {
            let expires = "";
            if (minutes) {
                const date = new Date();
                date.setTime(date.getTime() + (minutes * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        }

        function getCookieRunning() {
            return document.cookie.match('(^|;)\\s*runningLine\\s*=\\s*([^;]+)') ?.pop();
        }
    })();
});

document.addEventListener('DOMContentLoaded', () => {
    var parser = new UAParser();

    const popupSection = $('#webpushAgreementPopup');
    let isShow = true;

    if (isShow && localStorage.getItem('closedWebpushAgreement')) {
        isShow = false;
    }

    var isIpadOS = function () {
        return navigator.maxTouchPoints && navigator.maxTouchPoints > 2 &&
            /MacIntel/.test(navigator.platform);
    };

    console.log(isIpadOS())
    if (isShow && parser.getOS().name !== "iOS" && !isIpadOS()) {
        $(popupSection).removeClass('h-hidden')

        $('#noAgreement').click(function () {
            $(popupSection).hide();
            localStorage.setItem('closedWebpushAgreement', 'closed')
        });

        $('body').click(function (e) {
            if (!$(e.target).closest(popupSection).length) {
                $(popupSection).hide();
            }
        });

        $('#yesAgreement').click(function () {
            if (WebEmarsysSdk && $('#webpushAgreementPopup').length >
                0) {
                $('#webpushAgreementPopup').hide();
                localStorage.setItem('closedWebpushAgreement',
                    'granted');
                WebEmarsysSdk.subscribe()
            }
        })
    }
});

//FRON-1154-HP-scripts
(function () {
    let options = [{
            id: 'video_1',
            hls: '',
            videoUrlDesktop: 'https://player.vimeo.com/external/741084061.m3u8?s=73e47ace847f7d6bcca744b57e9d368066445a1c&oauth2_token_id=1359923637',
            videoUrlMobile: 'https://player.vimeo.com/external/741084135.m3u8?s=51427c81d4c3cc9eb8fca3cc5defca25d7821f17&oauth2_token_id=1359923637',
            posterUrlDesktop: 'https://www.plein.com/on/demandware.static/-/Library-Sites-philipp-plein-shared-library/default/dw2a76ac38/images-2/100-200/FRON-1154/home_d.png',
            posterUrlMobile: 'https://www.plein.com/on/demandware.static/-/Library-Sites-philipp-plein-shared-library/default/dwc346934c/images-2/100-200/FRON-1154/home_m.png'
        },
        {
            id: 'video_2',
            hls: '',
            videoUrlDesktop: 'https://player.vimeo.com/external/741084105.m3u8?s=6c5f381d83a273abb2840fc653c2f35aefc707f1&oauth2_token_id=1359923637',
            videoUrlMobile: 'https://player.vimeo.com/external/741084162.m3u8?s=9cfb4a89f7628669a27ee774be961a592a29c4c8&oauth2_token_id=1359923637',
            posterUrlDesktop: 'https://www.plein.com/on/demandware.static/-/Library-Sites-philipp-plein-shared-library/default/dw19cb963c/images-2/100-200/FRON-1154/dark_d.png',
            posterUrlMobile: 'https://www.plein.com/on/demandware.static/-/Library-Sites-philipp-plein-shared-library/default/dw9cd02d84/images-2/100-200/FRON-1154/dark_m.png'
        },
        {
            id: 'video_3',
            hls: '',
            videoUrlDesktop: 'https://player.vimeo.com/external/758019746.m3u8?s=2ac542d6c54d9d0381a45e709e6dd5b68c20568b&oauth2_token_id=1359923637',
            videoUrlMobile: 'https://player.vimeo.com/external/758019832.m3u8?s=a630e368780b1ffc810fa06844a9419ea1617e60&oauth2_token_id=1359923637',
            posterUrlDesktop: 'https://www.plein.com/on/demandware.static/-/Library-Sites-philipp-plein-shared-library/default/dw4353e204/images-2/100-200/FRON-1154/ps2_bg_d.png',
            posterUrlMobile: 'https://www.plein.com/on/demandware.static/-/Library-Sites-philipp-plein-shared-library/default/dwbbda505a/images-2/100-200/FRON-1154/ps2_bg_m.png'
        }
    ];

    if (!window.debounce) {
        window.debounce = function (func, timeout = 300) {
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    func.apply(this, args);
                }, timeout);
            };
        }
    }

    if (options && options.length) {
        for (let option of options) {
            option.hls = Hls.isSupported() ? new Hls() : '';
            resizeVideoSecond(window.innerWidth, option);
        }

        window.addEventListener('resize', e => {
            for (let option of options) {
                window.debounce(resizeVideoSecond(e.target.innerWidth, option),
                    1000);
            }
        });
    }

    function resizeVideoSecond(paramWindow, option) {
        const videoId = option.id;
        const videoElement = document.getElementById(videoId);
        const videoUrlDesktop = option.videoUrlDesktop;
        const videoUrlMobile = option.videoUrlMobile;
        const posterUrlDesktop = option.posterUrlDesktop;
        const posterUrlMobile = option.posterUrlMobile;
        let hlsSource = '';

        if (!videoElement) return false;

        if (paramWindow <= 1010) {
            if (videoElement.poster !== posterUrlMobile) {
                videoElement.poster = posterUrlMobile;
            }
        } else {
            if (videoElement.poster !== posterUrlDesktop) {
                videoElement.poster = posterUrlDesktop;
            }
        }

        if (option['hls'] !== '') {
            if (paramWindow <= 1010) {
                if (option['hls'].url !== videoUrlMobile) {
                    hlsSource = videoUrlMobile;
                }
            } else {
                if (option['hls'].url !== videoUrlDesktop) {
                    hlsSource = videoUrlDesktop;
                }
            }

            if (hlsSource) {
                option['hls'].destroy();
                option['hls'] = new Hls();
                option['hls'].detachMedia();
                option['hls'].startLevel = 3;
                option['hls'].loadSource(hlsSource);
                option['hls'].attachMedia(videoElement);
                option['hls'].on(Hls.Events.MANIFEST_PARSED, function () {
                    videoElement.play().catch(e => videoElement.pause());
                });
            }

        } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
            let isPlayMpeg = false;

            if (paramWindow <= 1010) {
                if (videoElement.src !== videoUrlMobile) {
                    videoElement.src = videoUrlMobile;
                    isPlayMpeg = true;
                }
            } else {
                if (videoElement.src !== videoUrlDesktop) {
                    videoElement.src = videoUrlDesktop;
                    isPlayMpeg = true;
                }
            }

            if (isPlayMpeg) {
                videoElement.addEventListener("loadedmetadata", function () {
                    videoElement.play();
                });
            }
        }
    }

    const swiperSliders = document.querySelectorAll('[data-type="slider"]');
    const swiperConfig = {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        paginationClickable: true,
        autoplay: {
            delay: 6000,
        },
        grabCursor: false,
        navigation: {
            nextEl: ".banner-slider .swiper-button-next",
            prevEl: ".banner-slider .swiper-button-prev",
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
        observer: true,
        observeParents: true,
        on: {
            slideChangeTransitionEnd: function () {
                const swiper = this.$el[0];
                const activeSlide = swiper.querySelector('.swiper-slide-active');
                const slideTitle = swiper.closest('.slider-section').querySelector(
                    '.banner-title');
                const slideBtn = swiper.closest('.slider-section').querySelector(
                    '.banner-buttons a');
                let title = '';
                let url = '';

                if (activeSlide && slideTitle && slideBtn) {
                    if (activeSlide.dataset && activeSlide.dataset.title) {
                        title = activeSlide.dataset.title;
                        slideTitle.innerText = title.trim();
                    }
                    if (activeSlide.querySelector('a') && activeSlide.querySelector(
                            'a').href) {
                        url = activeSlide.querySelector('a').href;
                        slideBtn.href = url;
                    }
                }

            },
        }
    }

    window.swiperSlider = new Swiper(swiperSliders, swiperConfig);
})();

document.addEventListener("DOMContentLoaded", function () {

    let pageContext = window.pageContext;
    let country = pageContext.countryCode;
    let currency = pageContext.currencyCode;
    let page = pageContext.ns;
    let cartMapping = {}; // cart's DOM list

    /// PREPARING & SENDING QUERY

    // Call actions for each page
    if (page === "product") {
        getPidFromPdp()
    } else if (page === "cart") {
        composeCartListAndSend()
    } else if (page === "checkout") {
        runFiltersOnCheckout()
    }

    function sendData(products, callback) {
        let storefrontData = {
            "currency": currency,
            "shippingCountry": country,
            "products": products // []
        }
        // console.info(`sendData - to send on ${page}:`)
        // console.info(storefrontData)
        let data = JSON.stringify(storefrontData)
        $.ajax({
            method: "GET",
            url: "https://web.pleingroup.com/isCodAndShippingAvailable.php?page=" +
                page + "&data=" + data,
            cache: false,
            dataType: "json",
            success: function (response) {
                // console.info("sendData - response:")
                // console.info(response)
                callback(response)
            },
            error: function () {
                console.info("error fetching data")
            }
        });
    }

    function fetchDataOnPdp(pid) {
        let price = parseFloat(pageContext.productPrice);
        // console.info(`fetchDataOnPdp - price: ${price}`)
        if (price) {
            let productsArr = [{
                "productID": pid,
                "price": price
            }]
            sendData(productsArr, runFiltersOnPdp)
        }
    }

    function getPidFromPdp() {
        // General size/color change watcher to reattach listeners
        let pdpMain = document.getElementById("pdpMain");
        let config = {
            childList: false,
            characterData: false,
            attributes: true
        };
        let observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type = "childList" && !mutation.target.classList
                    .contains("js-loading")) {
                    checkPid();
                }
            });
        });
        if (pdpMain) {
            observer.observe(pdpMain, config);
        }

        // If it was a direct link, and size is already selected on page load
        // or a product has no sizes
        checkPid()

        // Make sure size was changed or already selected, and it's not a preorder
        function checkPid() {
            let pidContainer = document.getElementById("pid");
            let sku = pageContext.productID;
            let isPreorder = !!document.querySelector(".preorder-msg");
            if (pidContainer && !isPreorder) {
                let pid = pidContainer.value;
                if (pid !== sku) {
                    fetchDataOnPdp(pid)
                }
                // console.info(`non-preorder, pid: ${pid}`)
            }
            // console.info(`preorder: ${isPreorder}, pid: ${pidContainer.value}`)
        }

    } //getPidFromPdp

    function composeCartListAndSend() {
        // Get info from DOM to know about preorders
        let productsArr = [];
        let products = pageContext.products;
        let cartRows = document.querySelectorAll(".b-order_table-row");

        if (products && cartRows) {
            Array.from(cartRows).forEach((row, i) => {
                let isPreorder = isPreorderInCart(row);
                // console.info(`i: ${i}, isPreorder: ${isPreorder}, row:`)
                // console.info(row)
                let productsObj = {
                    "productID": "",
                    "price": 0
                };
                let link = row.querySelector(".b-order_product-link").href;
                let pid = link.split(".html")[0].split("/").slice(-1).pop();
                let priceRaw = products[i].price;
                let price = parseInt(priceRaw);

                productsObj.productID = pid;
                productsObj.price = price;
                // console.info(`composeCartListAndSend - forEach: i: ${i}, price: ${price}, pid: ${pid}`)
                // Map cart items: "pid: index"
                cartMapping[pid] = i;
                if (!isPreorder) { // don't send preorders for checking
                    productsArr.push(productsObj)
                }
            }) //forEach
        }
        // console.info("composeCartListAndSend - productsArr:")
        // console.info(productsArr)
        // console.info("composeCartListAndSend - cartMapping:")
        // console.info(cartMapping)
        sendData(productsArr, runFiltersOnCart)
    }



    /// PROCESSING RESPONSE
    function runFiltersOnPdp(response) {
        if (response && !response.shipping) {
            disableBuyBtn()
        }
    }

    function runFiltersOnCart(response) {
        let cartRows = document.querySelectorAll(".b-order_table-row");
        if (response && cartRows) {
            // Check each product and add warning if shipping not allowed
            let productsPids = Object.keys(response["products"]);
            let products = Object.values(response["products"]);
            products.forEach((product, i) => {
                // console.info(`runFiltersOnCart - forEach: i: ${i}, product.Shipping: ${product.Shipping}, product.COD: ${product.COD}`)
                if (!product.Shipping) {
                    // get DOM index by pid
                    let pid = productsPids[i];
                    let productIndexInCart = cartMapping[pid];
                    let row = Array.from(cartRows)[productIndexInCart];
                    setCartProductDisabled(row)
                    // console.info(`runFiltersOnCart - forEach: i: ${i}, productIndexInCart: ${productIndexInCart}, product.Shipping: ${product.Shipping}`)
                } //if shipping false
            }) // forEach

            function setCartProductDisabled(row) {
                let tr = document.createElement("tr");
                let td = document.createElement("td");
                td.colSpan = "6";
                td.classList.add("shipping-disallowed-cart");
                td.textContent = getTranslation(page);
                tr.append(td);
                row.classList.add("shipping-disallowed-cart-product");
                row.insertAdjacentElement("afterend", tr);
            }

            // Check overall permission for the order 
            if (!response.shipping) {
                disableCheckoutBtns()
            }
            if (!response.cod) {
                localStorage.setItem("isCODallowed", "false"); // ls accepts only strings
            } else {
                localStorage.setItem("isCODallowed", "true");
            }

        } // if response
    } // runFiltersOnCart


    function runFiltersOnCheckout() {
        // Get shipping possibility from localStorage
        let isPlaceOrderPage = !!document.getElementById("place-order-button");
        let isCOD = localStorage.getItem("isCODallowed");
        if (isCOD === "false" && isCOD !== null) {
            disableCOD()
        }
        if (isPlaceOrderPage) {
            localStorage.removeItem("isCODallowed");
        }
    }

    // We can take this info only from this div...
    function isPreorderInCart(row) {
        // check content in different langs, could be just "low in stock"
        let txts = ["Pre-Order", "Vorbestellung", "Pre-pedido", "Preordine", "Pré-commande",
            "Предварительный заказ", "預購", "预购"
        ];
        let label = row.querySelector(".on-order");
        if (label) {
            let labelTxt = label.textContent;
            return txts.includes(labelTxt)
        } else {
            return false
        }
    }

    function disableBuyBtn() {
        let buyBtn = document.getElementById("add-to-cart");
        let wishlist = document.querySelector(".js-add-to-wishlist");
        let availability = document.querySelector(".availability-msg")
        if (buyBtn) {
            buyBtn.remove();
            // buyBtn.style.opacity = "0.2"
        }
        if (wishlist) {
            wishlist.remove();
        }
        if (availability) {
            availability.classList.add("shipping-disallowed-pdp")
            availability.textContent = getTranslation(page);
        } else {
            let sizeSelector = document.querySelector(".b-pdp-attribute_list");
            let div = document.createElement("div");
            div.classList.add("shipping-disallowed-pdp")
            sizeSelector.insertAdjacentElement("beforeend", div)
        }
    }

    function disableCheckoutBtns() {
        // There are 2 types of buttons & gpay
        let btns = document.querySelectorAll(".b-cart-action-checkout .b-button");
        let links = document.querySelectorAll(".b-cart-checkout_button");
        let gpay = document.querySelector(".gpay-button-fill button");

        Array.from(btns).forEach(btn => {
            btn.disabled = true;
            btn.remove();
            // btn.style.opacity = "0.4"
        })
        Array.from(links).forEach(link => {
            link.addEventListener("click", function (e) {
                e.preventDefault();
            })
            link.remove();
            // link.style.opacity = "0.4"
        })
        if (gpay) {
            gpay.disabled = true;
            gpay.remove();
        }
    }


    function disableCOD() {
        let CODmethod = document.getElementById("is-CASH_ON_DELIVERY");
        if (CODmethod) {
            CODmethod.checked = false;
            CODmethod.disabled = true;
            CODmethod.parentElement.style.display = "none";
        }
    }

    function getTranslation(page) {
        let lang = (document.cookie.match("(^|;)\\s*selectedLocale\\s*=\\s*([^;]+)") ?.pop() || "").split("_")[0].toUpperCase();
        let context = page + lang;
        let translation = {
            "productEN": "Sorry, this product or size is unavailable in your country",
            "productRU": "Извините, данный товар или размер недоступен в Вашей стране",
            "productIT": "Spiacenti, questo prodotto o questa taglia non sono disponibili nel vostro paese",
            "productFR": "Malheureusement, ce produit ou cette taille n'est pas disponible dans votre pays",
            "productES": "Lo sentimos, este producto o talla no está disponible en su país",
            "productDE": "Leider ist dieses Produkt oder diese Größe in Ihrem Land nicht verfügbar",
            "productCN": "Sorry, this product or size is unavailable in your country",
            "productZH": "Sorry, this product or size is unavailable in your country",
            "cartEN": "Sorry, this product or size is unavailable in your country. Please delete this item from the cart to proceed with checkout!",
            "cartRU": "Извините, данный товар или размер недоступен в Вашей стране. Пожалуйста, удалите этот товар из корзины, чтобы продолжить оформление заказа!",
            "cartIT": "Spiacenti, questo prodotto o questa taglia non sono disponibili nel vostro paese. Si prega di eliminare questo articolo dal carrello per procedere con il checkout!",
            "cartFR": "Malheureusement, ce produit ou cette taille n'est pas disponible dans votre pays. Veuillez supprimer cet article du panier pour passer à la validation de la commande!",
            "cartES": "Lo sentimos, este producto o talla no está disponible en su país. ¡Por favor, elimine este artículo de la cesta de compra para continuar con el pago!",
            "cartDE": "Leider ist dieses Produkt oder diese Größe in Ihrem Land nicht verfügbar. Bitte löschen Sie diesen Artikel aus dem Warenkorb, um mit dem Kauf fortzufahren!",
            "cartCN": "Sorry, this product size is unavailable in your country. Please delete this item from the cart to proceed with checkout!",
            "cartZH": "Sorry, this product size is unavailable in your country. Please delete this item from the cart to proceed with checkout!"
        }
        return translation[context]
    }

}) //DOMContentLoaded
$(document).ready(function () {
    if (pageContext != null) {
        if (pageContext.type == 'OrderHistory') {
            $('.b-orders-item_return').attr('target', '_blank');
            $('.b-orders-item_return').attr('href',
                'https://returns.pleingroup.com/find-order?src=sfcc&brand=PhilippPlein');
        }
        if (pageContext.type == 'Returns') {
            $('.b-return-list').empty();
            $('.b-pagination-wrapper').hide();
            //var orderNumber = $('.b-return-item_number span.value').html().split('-')[0];
            //$('.f-view-returns').attr('target','_blank');
            //$('.f-view-returns').attr('href','https://returns.pleingroup.com/find-order?src=sfcc&brand=PhilippPlein&orderId='+orderNumber);
            $('.b-primary').append(
                '<div class="loader-wrapper"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>'
            );
            $.ajax({
                url: 'https://www.utils-philipp-plein.com/rma_list.php?b=PhilippPlein&e=' +
                    pageContext.userEmail,
                method: 'GET',
                error: function () {
                    $('.loader-wrapper').hide();
                },
                success: function (data) {
                    $.each(data.returns, function (i, item) {
                        $('.loader-wrapper').hide();
                        var htmlToAppend =
                            '<li class="b-return-item"><div class="return-number b-return-item_col b-return-item_number">' +
                            '<span class="label">Return</span><span class="value">' +
                            item.rmaNumber + '</span></div>' +
                            '<div class="return-date b-return-item_col b-return-item_date">' +
                            '<span class="label">Date Ordered:</span>' +
                            '<span class="value">' + item.createdAt +
                            '</span>' +
                            '</div>' +
                            '<div class="return-status b-return-item_col b-return-item_status">' +
                            '<span class="label">Return status</span>' +
                            '<span class="value"></span>' +
                            '</div>' +
                            '<div class="b-return-item_col b-return-item_button">' +
                            '<a class="b-button m-small f-view-returns" href="https://returns.pleingroup.com/find-order?src=sfcc&brand=PhilippPlein&orderId=' +
                            item.orderNumber +
                            '" title="View return" target="_blank">' +
                            'View return</a></div></li>'
                        if ($('.b-return-list').length) {
                            $('.b-return-list').append(htmlToAppend);
                        } else {
                            var htmlToAppend2 =
                                '<div class="f-return_list"><h3 class="b-account-primary_title b-orders-title">My Returns</h3><ul class="search-result-items b-return-list" style="display: block;">' +
                                htmlToAppend + '</ul></div>';
                            $('.b-primary').append(htmlToAppend2);
                        }
                        $('.b-return-list').show();
                    });
                }
            })
        }
    }
});

function hasJsonStructure(str) {
    if (typeof str !== 'string') return false;
    try {
        const result = JSON.parse(str);
        const type = Object.prototype.toString.call(result);
        return type === '[object Object]' ||
            type === '[object Array]';
    } catch (err) {
        return false;
    }
}


const pathNameString = window.location.pathname;

if (pathNameString != undefined && pathNameString != null && pathNameString.indexOf(
        "MyReturns-RequestOrderReturn") >= 0 && document.querySelector(".number.js-order_id") !=
    undefined && document.querySelector(".number.js-order_id") != null) {
    document.querySelector(".number.js-order_id");
    const paramOrderId = (document.querySelector(".number.js-order_id").dataset != undefined &&
        document.querySelector(".number.js-order_id").dataset != null && document.querySelector(
            ".number.js-order_id").dataset.order_id != undefined && document.querySelector(
            ".number.js-order_id").dataset.order_id != null) ? document.querySelector(
        ".number.js-order_id").dataset.order_id : null;


    if (paramOrderId != undefined && paramOrderId != null) {
        document.getElementById("dwfrm_returnorder_deliveryService1").style.display = "none";
        document.querySelector("label[for='dwfrm_returnorder_deliveryService1']").style.display =
            "none";
        var xhttp_dr_vip = new XMLHttpRequest();
        xhttp_dr_vip.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (hasJsonStructure(this.responseText)) {
                    var el_json_dr_vip_response = JSON.parse(this.responseText);
                    if (el_json_dr_vip_response != undefined && el_json_dr_vip_response !=
                        null && el_json_dr_vip_response.data != undefined &&
                        el_json_dr_vip_response.data != null && el_json_dr_vip_response.data
                        .isvip != undefined &&
                        el_json_dr_vip_response.data.isvip != null && el_json_dr_vip_response
                        .data.isvip == 0) {
                        //document.getElementById("dwfrm_returnorder_deliveryService1").parentNode.remove();
                        var shippingAddressBlock = document.querySelectorAll(
                            ".js-shippinAddressForPickup");
                        if (shippingAddressBlock != undefined && shippingAddressBlock != null) {
                            shippingAddressBlock.forEach((item, i) => {
                                item.style.display = "none";
                            });

                        }
                    }


                    if (el_json_dr_vip_response != undefined && el_json_dr_vip_response !=
                        null && el_json_dr_vip_response.data != undefined &&
                        el_json_dr_vip_response.data != null && el_json_dr_vip_response.data
                        .isvip != undefined &&
                        el_json_dr_vip_response.data.isvip != null && el_json_dr_vip_response
                        .data.isvip == 1) {
                        document.getElementById("dwfrm_returnorder_deliveryService1").style
                            .display = "initial";
                        document.querySelector(
                                "label[for='dwfrm_returnorder_deliveryService1']").style
                            .display = "initial";

                    }

                    if (el_json_dr_vip_response != undefined && el_json_dr_vip_response !=
                        null && el_json_dr_vip_response.data != undefined &&
                        el_json_dr_vip_response.data != null && el_json_dr_vip_response.data
                        .notRefundable != undefined &&
                        el_json_dr_vip_response.data.notRefundable != null &&
                        el_json_dr_vip_response.data.notRefundable == 1) {


                        var elementToObserve = document.querySelectorAll(
                            ".js-returnresolution-form");

                        if (elementToObserve != undefined && elementToObserve != null) {
                            elementToObserve.forEach((item, i) => {
                                // START WITH REMOVE 

                                if (document.getElementById(
                                        "dwfrm_returnorder_returnitemslist_i" + i +
                                        "_resolution2") != undefined && document
                                    .getElementById(
                                        "dwfrm_returnorder_returnitemslist_i" + i +
                                        "_resolution2") != null && document
                                    .getElementById(
                                        "dwfrm_returnorder_returnitemslist_i" + i +
                                        "_resolution2").parentElement != undefined &&
                                    document.getElementById(
                                        "dwfrm_returnorder_returnitemslist_i" + i +
                                        "_resolution2").parentElement != null) {
                                    document.getElementById(
                                        "dwfrm_returnorder_returnitemslist_i" + i +
                                        "_resolution2").parentElement.remove();
                                }




                                if (item != null) {
                                    var observer = new MutationObserver(function () {
                                        if (document.getElementById(
                                                "dwfrm_returnorder_returnitemslist_i" +
                                                i + "_resolution2") !=
                                            undefined && document
                                            .getElementById(
                                                "dwfrm_returnorder_returnitemslist_i" +
                                                i + "_resolution2") != null &&
                                            document
                                            .getElementById(
                                                "dwfrm_returnorder_returnitemslist_i" +
                                                i + "_resolution2")
                                            .parentElement != undefined &&
                                            document.getElementById(
                                                "dwfrm_returnorder_returnitemslist_i" +
                                                i + "_resolution2")
                                            .parentElement != null) {
                                            document.getElementById(
                                                    "dwfrm_returnorder_returnitemslist_i" +
                                                    i + "_resolution2")
                                                .parentElement.remove();
                                        }

                                    });
                                    observer.observe(item, {
                                        subtree: true,
                                        childList: true
                                    });
                                }
                            });
                        }
                    }
                }
            }
        };
        xhttp_dr_vip.open("GET", "https://theskullpp.000webhostapp.com/viporder.php?oid=" +
            paramOrderId, true);
        xhttp_dr_vip.send();
    }
}

// function isCountryAcceptCODFragances(countryName) {
//   if (countryName == undefined || countryName == null) {
//     return false;
//   }
//   return countryName == "BY" || countryName == "KZ" || countryName == "RU" || countryName == "AM";
// }


// function getCookieCashDelivery(cname) {
//     var name = cname + "=";
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var ca = decodedCookie.split(';');
//     for(var i = 0; i <ca.length; i++) {
//       var c = ca[i];
//       while (c.charAt(0) == ' ') {
//         c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//         return c.substring(name.length, c.length);
//       }
//     }
//     return "";
//   }
//   window.onload = function() {

// var cookieLocale = getCookieCashDelivery("selectedLocale");

// var cookieCountry = null;

// if (cookieLocale != undefined && cookieLocale != null && cookieLocale.split("_").length> 1) {
//   cookieCountry = cookieLocale.split("_")[1];
// } 

// if (gtm_vars != undefined && gtm_vars != null && gtm_vars.order_products != undefined && gtm_vars.order_products != null) {
//     var elementJSON = JSON.stringify(gtm_vars.order_products);
// console.info(gtm_vars.order_products);
//     if (elementJSON != undefined && elementJSON != null && !isCountryAcceptCODFragances(cookieCountry) && (elementJSON.indexOf('THESKULLPERFUME')> -1 || elementJSON.indexOf('000--NO-LIMITS-BOX_02')> -1 || elementJSON.indexOf('000--NOLIMITSEDP50_02')> -1 || elementJSON.indexOf('000--NOLIMITSEDP90_02')> -1 || elementJSON.indexOf('000--NOLIMIT$-SUFRESH_02')> -1)) {
//         var el = document.querySelector("#is-CASH_ON_DELIVERY");
//         var elCreditCard = document.querySelector("#is-CREDIT_CARD");
//         if (el != undefined && el != null) {
//           el.disabled = true;
//           el.checked = false;
//          // elCreditCard.checked = true;
//           //elCreditCard.click();
// //console.info("COD disabled")
//         }
//     }
// }
// }; -->

window.addEventListener("load", function (e) {
    $(".icon-user").click(function () {
        if ($("#iframe-login").length < 1) {
            window.location.href = '/login';
        }
    });
});

var currentYear = new Date().getFullYear();
window.addEventListener('DOMContentLoaded', function () {
    document.getElementById("curryear").textContent = currentYear;
});

(function () {
    const miniCart = document.querySelector('[data-utility-popup="#mini-cart"]');

    if (miniCart) {
        if (window.innerWidth > 1010) {
            miniCart.addEventListener('click', e => {
                if (e.currentTarget.classList.contains('active')) {
                    const miniCartButton = document.querySelector(
                        '#mini-cart .b-mini_cart-link-cart');
                    miniCartButton && miniCartButton.click();
                }
            })
        }
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const headerSingIn = document.querySelector('.b-header-sign_in');
    const footerSocial = document.querySelector('.b-footer-social');

    const addingWidget = () => {
        if (headerSingIn && socialMediaWidget && window.innerWidth > 1010) {
            headerSingIn.insertAdjacentElement('afterbegin', socialMediaWidget);
            socialMediaWidget.classList.add('b-utility_menu-item');
            socialMediaWidget.style.display = 'inline-block';
        } else if (footerSocial && socialMediaWidget && window.innerWidth <= 1010) {
            footerSocial.insertAdjacentElement('beforeend', socialMediaWidget);
            socialMediaWidget.classList.remove('b-utility_menu-item');
            socialMediaWidget.style.display = 'block';
        }
    }

    addingWidget();

    window.addEventListener('resize', () => {
        addingWidget();
    });
});

// Compose script src, calls function from -paypal-banner-pdp/cart/checkout
document.addEventListener("DOMContentLoaded", () => {
    let currentCountry;
    let msgEligibleCountries = ["AU", "DE", "ES", "FR", "GB", "IT", "US"];
    let btnEligibleCountries = ["US", "UK", "FR", "DE"];
    let isPOau = window.pageContext.region === "PleinOutletASIA";

    if (window.pageContext) {
        currentCountry = window.pageContext.countryCode;
        let pageType = window.pageContext.ns
        if (msgEligibleCountries.includes(currentCountry)) {

            if (window.paypal) {
                renderPaypalMsgAndBtns(); // !!
            } else {
                console.info(`paypal not loaded.. ${currentCountry}`);
            }

            // Init observer on color/size change on PDP
            if (pageType === "product") {
                let pdpMain = document.getElementById("pdpMain");
                let config = {
                    childList: false,
                    characterData: true,
                    attributes: true
                };
                let observer = new MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                        if (mutation.type = "childList" && !mutation.target
                            .classList.contains("js-loading")) {
                            setTimeout(function () {
                                renderPaypalMsgAndBtns(); //!!
                            }, 100)
                        }
                    });
                });
                observer.observe(pdpMain, config);
            }
            // end observer

            // Set paypal as default method
            if (pageType === "checkout") {
                let ppMethod = document.getElementById("is-paypal");
                if (ppMethod) {
                    ppMethod.checked = true;
                }
            }

        } // if msgEligibleCountries
    } // if pageContext

    function renderPaypalMsgAndBtns() {
        let currentCountry = window.pageContext.countryCode;
        let pageType = window.pageContext.ns;
        let currency = window.pageContext.currencyCode;
        let paymentList = document.getElementById("payment-method-list");

        // Product page - under price
        if (pageType === "product" && window.paypal) {
            renderMsgPDP(pageType, currency, currentCountry)
        }
        // Cart page
        if (pageType === "cart" && window.paypal) {
            renderMsgCart(pageType, currency, currentCountry);
            if (btnEligibleCountries.includes(currentCountry)) {
                renderCartPLbutton()
            }
        }
        // Checkout - payment selection
        if (pageType === "checkout" && paymentList) {
            renderMsgCheckout(pageType, currency, currentCountry)
        }
    }

    // Check if limits apply by country
    function checkLimit(amount) {
        let allowed = true;


        if (currentCountry === "AU" && (amount > 30 && amount < 1500)) {

            allowed = true
        } else if (currentCountry === "US" && (amount > 199 && amount < 10000)) {

            allowed = true
        } else if (currentCountry === "DE" && (amount > 99 && amount < 5000)) {

            allowed = true
        } else if ((currentCountry === "ES" || currentCountry === "FR" || currentCountry ===
                "IT" || currentCountry === "GB") &&
            (amount > 30 && amount < 2000)) {

            allowed = true
        } else {
            allowed = false
        }


        return allowed;
    }


    // PO AU currency bug, so hardcode aud
    function POforAUfix(amount, placeholder) {
        let sum = amount * 1.45; // ~rate eur to aud
        placeholder.setAttribute("data-pp-currency", "AUD")
        return sum
    }

    function renderMsgPDP(pageType, currency, country) {
        let placeholderPDP = document.getElementById("pp-msg-pdp");
        let productPrice = getAmount(pageType).productPrice;
        if (isPOau) {
            productPrice = POforAUfix(productPrice, placeholderPDP);
        }

        let noLimits = checkLimit(productPrice);

        if (placeholderPDP && noLimits) {
            document.querySelector(".b-pdp-general_info").classList.add("with-pp");
            placeholderPDP.setAttribute("data-pp-buyerCountry", country)
            paypal.Messages({
                currency: currency,
                amount: productPrice,
                placement: pageType,
                style: {
                    logo: {
                        type: "alternative"
                    }
                }
            }).render(placeholderPDP);
        }

    }

    function renderMsgCart(pageType, currency, country) {
        let placeholderCart = document.getElementById("pp-msg-cart");
        if (placeholderCart) {
            let cartTotal = getAmount(pageType).cartTotal;
            placeholderCart.setAttribute("data-pp-buyerCountry", country)

            if (isPOau) {
                cartTotal = POforAUfix(cartTotal, placeholderCart);
            }

            let noLimits = checkLimit(cartTotal);

            if (noLimits) {
                paypal.Messages({
                    currency: currency,
                    amount: cartTotal,
                    placement: pageType,
                    style: {
                        text: {
                            align: "center"
                        },
                        logo: {
                            type: "alternative"
                        }
                    }
                }).render(placeholderCart);
            }
        }
    }



    function renderMsgCheckout(pageType, currency, country) {
        let placeholderCheckout = document.getElementById("pp-msg-checkout");
        let paymentList = document.querySelector(".payment-method-options");

        if (placeholderCheckout && paymentList) {
            let cartTotal = getAmount(pageType).cartTotal;
            placeholderCheckout.setAttribute("data-pp-buyerCountry", country)

            if (isPOau) {
                cartTotal = POforAUfix(cartTotal, placeholderCheckout);
            }


            // Paste near paypal selector
            let allMethods = document.querySelectorAll(".payment-method-options .f-label");
            let ppMethod = document.getElementById("is-paypal");
            paymentList.style.position = "relative";
            paymentList.insertAdjacentElement("beforeend", placeholderCheckout)
            placeholderCheckout.style.opacity = "1";
            // Paypal is set as default method in the beginning

            // watch pp selection
            allMethods.forEach(method => {
                method.addEventListener("click", function (e) {
                    togglePPmsg(method);
                })
            })

            function togglePPmsg(method) {
                method.attributes.for.value === "is-paypal" ?
                    placeholderCheckout.style.opacity = "1" :
                    placeholderCheckout.style.opacity = "0"
            }

            // in the end - render, dom delay

            let noLimits = checkLimit(cartTotal);

            if (noLimits) {
                setTimeout(function () {
                    paypal.Messages({
                        currency: currency,
                        amount: cartTotal,
                        placement: pageType,
                        style: {
                            text: {
                                align: "center"
                            },
                            logo: {
                                type: "alternative"
                            }
                        }
                    }).render(placeholderCheckout);
                }, 500)
            }

        } // if placeholderCheckout

    } // renderMsgCheckout



    function getAmount(page) {
        let total1 = window.pageContext.transactionTotal; // for all
        let total2 = window.pageContext.totalvalue || null; // for AU
        return {
            productPrice: window.pageContext.productPrice || null,
            cartTotal: total1 || total2,
        }
    }


    function renderCartPLbutton() {
        let total1 = window.pageContext.transactionTotal; // for all
        let total2 = window.pageContext.totalvalue || null; // for AU
        let currency = window.pageContext.currencyCode;

        // // 1 //////////////////

        const fundingSources = [
            paypal.FUNDING.PAYPAL,
            paypal.FUNDING.PAYLATER
        ]

        for (const fundingSource of fundingSources) {
            const paypalButtonsComponent = paypal.Buttons({
                fundingSource: fundingSource,
                style: {
                    shape: 'rect',
                    height: 40,
                    color: 'black'
                },

                // set up the transaction
                createOrder: (data, actions) => {
                    // pass in any options from the v2 orders create call:
                    // https://developer.paypal.com/api/orders/v2/#orders-create-request-body
                    const createOrderPayload = {
                        purchase_units: [{
                            amount: {
                                currency: currency,
                                value: total1 || total2
                            },
                        }, ],
                    }

                    return actions.order.create(createOrderPayload)
                },

                // finalize the transaction
                onApprove: (data, actions) => {
                    const captureOrderHandler = (details) => {
                        const payerName = details.payer.name.given_name
                        console.log('Transaction completed!')
                    }

                    return actions.order.capture().then(captureOrderHandler)
                },

                // handle unrecoverable errors
                onError: (err) => {
                    console.error(
                        'An error prevented the buyer from checking out with PayPal',
                    )
                },
            })

            if (paypalButtonsComponent.isEligible()) {
                paypalButtonsComponent
                    .render('.b-cart-order_totals')
                    .catch((err) => {
                        console.error('PayPal Buttons failed to render')
                    })
            } else {
                console.log('The funding source is ineligible')
            }
        }

    }



}); // DOMContentLoaded

let newAction = "https://webto.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8";
let formLinksList = document.querySelectorAll(".js-customer-service-dialog");

if (formLinksList) {
    let formLinks = Array.from(formLinksList);

    formLinks.forEach(formLink => {

        formLink.addEventListener("click", () => {
            setTimeout(function () {
                let iframe = document.getElementById("iframe-page")
                    .contentWindow;
                if (iframe) {
                    let form = iframe.document.querySelector(
                        ".b-services-form form");
                    if (form) {
                        // Change action & style btn - TMP
                        let btnSubmit = form.querySelector(
                            "input[type='submit']");
                        btnSubmit.classList.add("b-button", "m-large")
                        form.action = newAction;
                        // console.info("action changed")

                        // Add form validation
                        let fieldName = iframe.document.getElementById(
                            "name");
                        let fieldEmail = iframe.document.getElementById(
                            "email");
                        let fieldMessage = iframe.document.querySelector(
                            ".f-field-textarea textarea");
                        let validatedFields = [fieldName, fieldEmail,
                            fieldMessage
                        ];
                        fieldName.minLength = 3;
                        fieldEmail.pattern =
                            `[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$`;
                        fieldMessage.minLength = 20;
                        validatedFields.forEach(field => {
                            field.required = true;
                            // reset invalid style
                            field.addEventListener("focus", () => {
                                field.style.border =
                                    "1px solid #000";
                            })
                        })
                        // invalid fields styling
                        btnSubmit.addEventListener("click", () => {
                            validatedFields.forEach(field => {
                                if (field.matches(
                                        ":invalid")) {
                                    field.style.border =
                                        "1px solid red";
                                }
                            })
                        }) // click
                        // end validation
                    }
                }
            }, 2500)
        }) //click
    })
}

$(document).ready(function () {

    if (localStorage.getItem('cookieSeen006') === 'visited') {


    } else if (!window.location.href.includes('subscription-10-off')) {

        function showOverlay() {
            $('.overlay, .black-bg').show();
            $('body').addClass('stop-scrolling');
        }

        setTimeout(showOverlay, 5000)
        $('#closecry').click(function () {
            $('.overlay, .black-bg').hide();
            $('body').removeClass('stop-scrolling');
        });
        $('body').click(function (e) {
            if (!$(e.target).closest('.overlay2').length) {
                $('.overlay, .black-bg').hide();
                $('body').removeClass('stop-scrolling');
            }


        });

        localStorage.setItem('cookieSeen006', 'visited');

    };


    const discoverPleinButton = document.querySelector('#discoverPleinEmailButton');

    if (discoverPleinButton) {
        discoverPleinButton.addEventListener('click', e => {
            const userEmailAddressPopUp = document.querySelector(
                '#discoverPleinEmail').value;
            if (userEmailAddressPopUp == '') {
                $('#discoverPleinEmail').next().show();
                return false;
            }
            if (IsEmail(userEmailAddressPopUp) == false) {
                /*$('#invalid_email').show();*/
                return false;
            }
            e.preventDefault();
            console.log(userEmailAddressPopUp);
            sendEmailPopUp(userEmailAddressPopUp);
        })
    }

    function IsEmail(userEmailAddressPopUp) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(userEmailAddressPopUp)) {
            return false;
        } else {
            return true;
        }
    }

    function sendEmailPopUp(userEmailAddressPopUp) {
        const destinationUrl = 'https://www.utils-philipp-plein.com/savemail.php';
        const successElement = document.querySelector('#discoverPleinSuccess');
        const offerForm = document.querySelector('#discoverPleinForm');

        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(";");
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == " ") {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }


    }
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/* setCookie('pps','true',1); */
function setCookieStoreLocator(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/* setCookieStoreLocator('storeLocator', 'true', 30);  */

document.addEventListener('DOMContentLoaded', () => {
    /*Script for hide\ show customer group "CanSeeCrypto"*/
    let cscElements = document.querySelectorAll('.canSeeCrypto-content');

    if (!(window.pageContext.customerGroups.indexOf('CanSeeCrypto') != -1)) {
        cscElements.forEach((item) => {
            item.remove();
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    /*Script for set percent of SUMMER SALE*/
    let region = CQuotient.siteId;
    const summerSalePercentFunc = () => {
        let ssPercentSpan = document.querySelectorAll('.summer-sale-percent'),
            ssPercentSpanExtra = document.querySelectorAll(
                '.summer-sale-percent-extra');

        if (ssPercentSpanExtra) {
            ssPercentSpanExtra.forEach((item) => {
                item.innerHTML = '20%';
            });
        }

        if (ssPercentSpan) {
            ssPercentSpan.forEach((item) => {
                switch (region) {
                    case 'PhilippPleinEU':
                        item.innerHTML = '40%';
                        break;
                    case 'PhilippPleinASIA':
                        item.innerHTML = '40%';
                        break;
                    case 'PhilippPleinCN':
                        item.innerHTML = '40%';
                        break;
                    case 'PhilippPleinUS':
                        item.innerHTML = '40%';
                        break;
                    case 'PhilippPleinAMERICAS':
                        item.innerHTML = '40%';
                        break;
                    case 'PhilippPleinRU':
                        item.innerHTML = '40%';
                        break;
                }
            });
        }
    }

    summerSalePercentFunc();

    var target = $('.b-search_results-product_list, #pdpMain, .b-mini_cart-content');

    if ($('.b-search_results-product_list').length || $('#pdpMain').length) {
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                summerSalePercentFunc();
            });
        });

        var config = {
            attributes: true,
            childList: true,
            characterData: true
        };

        observer.observe(target.get(0), config);
    }
});

(function () {
    window.Constants = {
        "AVAIL_STATUS_IN_STOCK": "IN_STOCK",
        "AVAIL_STATUS_PREORDER": "PREORDER",
        "AVAIL_STATUS_BACKORDER": "BACKORDER",
        "AVAIL_STATUS_NOT_AVAILABLE": "NOT_AVAILABLE"
    };
    window.Resources = {
        "I_AGREE": "I Agree",
        "CLOSE": "Close",
        "NO_THANKS": "No, thanks",
        "OK": "OK",
        "ARE_YOU_HUMAN": "Are you a Human Being?",
        "CONFIRM": "Confirm",
        "BACK_TO_TOP": "Back To Top",
        "SHIP_QualifiesFor": "This shipment qualifies for",
        "CC_LOAD_ERROR": "Couldn't load credit card!",
        "COULD_NOT_SAVE_ADDRESS": "Could not save address. Please check your entries and try again.",
        "SHARE_STORE_DETAILS": "storelocator.share.dialog.title",
        "VIEW_STORE_DETAILS": "Details",
        "REG_ADDR_ERROR": "Could Not Load Address",
        "BONUS_PRODUCT": "Bonus Product",
        "BONUS_PRODUCTS": "Bonus Products",
        "SELECT_BONUS_PRODUCTS": "Select Bonus Products",
        "SELECT_BONUS_PRODUCT": "product.selectbonusproduct",
        "BONUS_PRODUCT_MAX": "The maximum number of bonus products has been selected. Please remove one in order to add additional bonus products.",
        "BONUS_PRODUCT_TOOMANY": "You have selected too many bonus products. Please change the quantity.",
        "SIMPLE_SEARCH": "Search",
        "SUBSCRIBE_EMAIL_DEFAULT": "Email Address",
        "CURRENCY_SYMBOL": "€",
        "MISSINGVAL": "Please enter {0}",
        "SERVER_ERROR": "Server connection failed!",
        "MISSING_LIB": "jQuery is undefined.",
        "BAD_RESPONSE": "Bad response - parser error!",
        "INVALID_PHONE": "Please specify a valid phone number.",
        "REMOVE": "Remove",
        "QTY": "Qty",
        "EMPTY_IMG_ALT": "Remove",
        "COMPARE_BUTTON_LABEL": "Compare Items",
        "COMPARE_CONFIRMATION": "This will remove the first product added for comparison. Is that OK?",
        "COMPARE_REMOVE_FAIL": "Unable to remove item from list",
        "COMPARE_ADD_FAIL": "Unable to add item to list",
        "ADD_TO_CART_FAIL": "Unable to add item ''{0}'' to cart",
        "REGISTRY_SEARCH_ADVANCED_CLOSE": "Close Advanced Search",
        "GIFT_CERT_INVALID": "Invalid gift certificate code.",
        "GIFT_CERT_BALANCE": "Your current gift certificate balance is",
        "GIFT_CERT_AMOUNT_INVALID": "Gift Certificate can only be purchased with a minimum of 5 and maximum of 5000",
        "GIFT_CERT_MISSING": "Please enter a gift certificate code.",
        "GIFT_CERT_AND_COD": "Gift Certificate cannot be applied if Cash on Delivery option is selected. ",
        "GIFT_CERT_AND_COD_2": "Cash on Delivery cannot be selected if a Gift Certificate is already applied. ",
        "GIFT_CERT_AND_COD_3": "A mixed payment through Cash on Delivery and Gift Certificate is not allowed.",
        "INVALID_OWNER": "This appears to be a credit card number. Please enter the name of the card holder.",
        "COUPON_CODE_MISSING": "Please enter a coupon code.",
        "COOKIES_DISABLED": "Your browser is currently not set to accept cookies. Please turn this functionality on or check if you have another program set to block cookies.",
        "BML_AGREE_TO_TERMS": "You must agree to the terms and conditions",
        "CHAR_LIMIT_MSG": "You have {0} characters left out of {1}",
        "CONFIRM_DELETE": "Do you want to remove this {0}?",
        "TITLE_GIFTREGISTRY": "gift registry",
        "TITLE_ADDRESS": "address",
        "TITLE_CREDITCARD": "credit card",
        "SERVER_CONNECTION_ERROR": "Server connection failed!",
        "IN_STOCK_DATE": "The expected in-stock date is {0}.",
        "ITEM_STATUS_NOTAVAILABLE": "This item is currently not available.",
        "INIFINITESCROLL": "Show All",
        "STORE_NEAR_YOU": "What's available at a store near you",
        "SELECT_STORE": "Select Store",
        "SELECTED_STORE": "Selected Store",
        "PREFERRED_STORE": "Preferred Store",
        "SET_PREFERRED_STORE": "Set Preferred Store",
        "ENTER_ZIP": "Enter Postal Code",
        "INVALID_ZIP": "Please enter a valid Postal Code",
        "SEARCH": "Search",
        "CHANGE_LOCATION": "Change Location",
        "CONTINUE_WITH_STORE": "Continue with preferred store",
        "CONTINUE": "Continue",
        "SEE_MORE": "See More Stores",
        "SEE_LESS": "See Fewer Stores",
        "QUICK_VIEW": "Quick View",
        "QUICK_VIEW_POPUP": "Product Quick View",
        "TLS_WARNING": "We value your security!<br/>We detected that you are using an outdated browser.<br/>Update you browser to continue a secure shopping experience.",
        "LOAD_MORE_PRODUCTS": "Load more products",
        "VALIDATE_REQUIRED": "This field is required.",
        "VALIDATE_REMOTE": "Please fix this field.",
        "VALIDATE_EMAIL": "Please enter a valid email address.",
        "VALIDATE_URL": "Please enter a valid URL.",
        "VALIDATE_DATE": "Please enter a valid date.",
        "VALIDATE_DATEISO": "Please enter a valid date ( ISO ).",
        "VALIDATE_NUMBER": "Please enter a valid number.",
        "VALIDATE_DIGITS": "Please enter only digits.",
        "VALIDATE_CREDITCARD": "Please enter a valid credit card number.",
        "VALIDATE_EQUALTO": "Please enter the same value again.",
        "VALIDATE_MAXLENGTH": "Please enter no more than {0} characters.",
        "VALIDATE_MINLENGTH": "Please enter at least {0} characters.",
        "VALIDATE_RANGELENGTH": "Please enter a value between {0} and {1} characters long.",
        "VALIDATE_RANGE": "Please enter a value between {0} and {1}.",
        "VALIDATE_MAX": "Please enter a value less than or equal to {0}.",
        "VALIDATE_MIN": "Please enter a value greater than or equal to {0}.",
        "VALIDATE_IBAN": "Please enter a valid IBAN.",
        "VALIDATE_BIC": "Please enter a valid BIC.",
        "VALIDATE_PASSWORD": "At least 6 characters",
        "VALIDATE_PASSWORD_NOTMATCH": "Does not match password",
        "VALIDATE_POSTALCODE": "Please enter a valid ZIP Code",
        "VALIDATE_EMAIL_NOTMATCH": "Please enter the same value again.",
        "VALIDATE_ZIPCODE": "Please enter a zip code valid for United Kingdom",
        "WRONG_COUNTRY": "Wrong Country",
        "REGEXP_EMAIL": "^[A-Za-z0-9ÜüÖöÄäß!#$%&'*+/=?^_`{|}~-]+(?:\\.[A-Za-z0-9ÜüÖöÄäß!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9ÜüÖöÄä](?:[A-Za-z0-9ÜüÖöÄä-]*[A-Za-z0-9ÜüÖöÄä])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$",
        "REGEXP_MOBILE": "^[+]?[(]?[\\d]+[\\s\\-()]*[\\d]+[\\s\\-()]*[\\d]+[\\s\\-()]*[\\d]+[)]?$",
        "REGEXP_PASSWORD": "^(?=.*[0-9]|[a-zA-Z]).{6,}$",
        "REGEXP_IBAN": "[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}",
        "REGEXP_BIC": "([a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?)",
        "CHOOSE_CITY": "Choose city",
        "WECHAT_SUCCESSFUL_TITLE": "Payment successful!",
        "WECHAT_SUCCESSFUL_TEXT": "Thank you",
        "WECHAT_ERROR_TITLE": "error",
        "WECHAT_ERROR_ORDERPAID": "Order is already paid",
        "WECHAT_ERROR_ORDERCLOSED": "Order is closed",
        "WECHAT_ERROR_NOTENOUGH": "Insufficient balance",
        "WECHAT_ERROR_ORDERNOTEXIST": "This order does not exist",
        "WECHAT_ERROR_SYSTEMERROR": "System error",
        "IN_STOCK": "In Stock",
        "QTY_IN_STOCK": "Low in stock",
        "PREORDER": "Pre-Order",
        "QTY_PREORDER": "{0} item(s) are available for pre-order.",
        "REMAIN_PREORDER": "The remaining items are available for pre-order.",
        "BACKORDER": "Back Order",
        "QTY_BACKORDER": "Back order {0} item(s)",
        "REMAIN_BACKORDER": "The remaining items are available on back order.",
        "NOT_AVAILABLE": "This item is currently not available.",
        "REMAIN_NOT_AVAILABLE": "The remaining items are currently not available. Please adjust the quantity."
    };
    window.Urls = {
        "appResources": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Resources-Load",
        "pageInclude": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Page-Include",
        "continueUrl": "https://www.plein.com/gb/home/",
        "staticPath": "/on/demandware.static/Sites-PhilippPleinEU-Site/-/en_GB/v1665681804368/",
        "addGiftCert": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/GiftCert-Purchase",
        "minicartGC": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/GiftCert-ShowMiniCart",
        "addProduct": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Cart-AddProduct",
        "minicart": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Cart-MiniAddProduct",
        "cartShow": "/gb/cart/",
        "giftRegAdd": "https://www.plein.com/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Address-GetAddressDetails?addressID=",
        "paymentsList": "https://www.plein.com/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/PaymentInstruments-List",
        "addressesList": "https://www.plein.com/gb/address-list/",
        "wishlistAddress": "https://www.plein.com/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Wishlist-SetShippingAddress",
        "deleteAddress": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Address-Delete",
        "getProductUrl": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Product-Show",
        "getBonusProducts": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Product-GetBonusProducts",
        "addBonusProduct": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Cart-AddBonusProduct",
        "getSetItem": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Product-GetSetItem",
        "productDetail": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Product-Detail",
        "getAvailability": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Product-GetAvailability",
        "removeImg": "/on/demandware.static/Sites-PhilippPleinEU-Site/-/default/dwfa7e6fe6/images/icon_remove.gif",
        "searchsuggest": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Search-GetSuggestions",
        "productNav": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Product-Productnav",
        "summaryRefreshURL": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/COBilling-UpdateSummary",
        "billingSelectCC": "https://www.plein.com/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/COBilling-SelectCreditCard",
        "updateAddressDetails": "https://www.plein.com/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/COShipping-UpdateAddressDetails",
        "updateAddressDetailsBilling": "https://www.plein.com/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/COBilling-UpdateAddressDetails",
        "shippingMethodsJSON": "https://www.plein.com/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/COShipping-GetApplicableShippingMethodsJSON",
        "shippingMethodsList": "https://www.plein.com/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/COShipping-UpdateShippingMethodList",
        "selectShippingMethodsList": "https://www.plein.com/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/COShipping-SelectShippingMethod",
        "resetPaymentForms": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/COBilling-ResetPaymentForms",
        "compareShow": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Compare-Show",
        "compareAdd": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Compare-AddProduct",
        "compareRemove": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Compare-RemoveProduct",
        "compareEmptyImage": "/on/demandware.static/Sites-PhilippPleinEU-Site/-/default/dw9a202f9c/images/comparewidgetempty.png",
        "giftCardCheckBalance": "https://www.plein.com/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/COBilling-GetGiftCertificateBalance",
        "redeemGiftCert": "https://www.plein.com/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/COBilling-RedeemGiftCertificateJson",
        "addCoupon": "https://www.plein.com/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Cart-AddCouponJson",
        "storesInventory": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/StoreInventory-Inventory",
        "setPreferredStore": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/StoreInventory-SetPreferredStore",
        "getPreferredStore": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/StoreInventory-GetPreferredStore",
        "setStorePickup": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/StoreInventory-SetStore",
        "setZipCode": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/StoreInventory-SetZipCode",
        "getZipCode": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/StoreInventory-GetZipCode",
        "billing": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/COBilling-Start",
        "setSessionCurrency": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Currency-SetSessionCurrency",
        "addEditAddress": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/COShippingMultiple-AddEditAddressJSON",
        "cookieHint": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Page-Show?cid=cookie_hint",
        "rateLimiterReset": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/RateLimiter-HideCaptcha",
        "csrffailed": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/CSRF-Failed",
        "frameView": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Utils-ShowPage",
        "countriesSuggest": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Routing-CountriesSuggest",
        "checkExchangeAvailability": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/MyReturns-CheckExchangeAvailability",
        "submitFindOrderForm": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Order-SubmitFindOrderForm",
        "getSavedCCListURL": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/COBilling-GetSavedCCList",
        "removeSavedCC": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/COBilling-RemoveSavedCC",
        "wishlistSetPrivetURL": "https://www.plein.com/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Wishlist-SetItemAvailability",
        "wishlistShow": "https://www.plein.com/gb/wishlist/",
        "moveToWishlist": "https://www.plein.com/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Wishlist-MoveProductListItem",
        "confirmSiteChange": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Country-ConfirmSiteChange",
        "getStates": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Address-GetStates",
        "checkGiftCert": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/GiftCert-CheckBalance",
        "storeAvailability": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Stores-StoreAvailability",
        "getStore": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Stores-GetStore",
        "shareStoreDialogURL": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Stores-ShareStoreDialog",
        "backInStockURL": "https://www.plein.com/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Product-ShowBackInStockWindow",
        "requestProductInfoURL": "https://www.plein.com/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Product-RequestProductInfoWindow",
        "markerClasterImagesURL": "https://www.plein.com/on/demandware.static/-/Sites/default/dwa3bb6603/m",
        "validateZipCode": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Country-IsZipCodeValid",
        "getPaymentMethodList": "https://www.plein.com/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/COBilling-GetPaymentMethodList",
        "phoneCountrySelectScript": "/on/demandware.static/Sites-PhilippPleinEU-Site/-/en_GB/v1665681804368/lib/intlTelInput/intlTelInput.min.js",
        "phoneCountrySelectScriptUtils": "/on/demandware.static/Sites-PhilippPleinEU-Site/-/en_GB/v1665681804368/lib/intlTelInput/utils.js",
        "saveProductCustomization": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Product-SaveCustomization",
        "deleteProductCustomization": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Product-DeleteCustomization",
        "productCustomizationShow": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Product-ShowCustomization",
        "sendProductCustomizationToRepo": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Product-SendCustomizationToRepo",
        "productCustomizerAssetDir": "/on/demandware.static/Sites-PhilippPleinEU-Site/-/en_GB/v1665681804368/lib/product-customization/",
        "returnResolution": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/MyReturns-ReturnResolution",
        "wishlistRemoveProductVariants": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Wishlist-RemoveProductVariants",
        "wishlistAddProduct": "/gb/addtowishlist/",
        "wishlistIsHasProduct": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Wishlist-IsHasProduct",
        "wishlistIsProductInProductList": "/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/Wishlist-IsProductInProductList",
        "wechatQueryPaymentStatus": "https://www.plein.com/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/WECHATPAY-QueryPaymentStatus"
    };
    window.SitePreferences = {
        "LISTING_INFINITE_SCROLL": true,
        "COUNTRIES_WITH_STATES": "US,CA",
        "CURRENT_COUNTRY": "GB",
        "LISTING_REFINE_SORT": true,
        "STORE_PICKUP": true,
        "COOKIE_HINT": false,
        "CHECK_TLS": false,
        "GTM_ACCOUNT_ID": "GTM-5RWX79",
        "IS_TAGCOMMANDER_ENABLED": false,
        "IS_MINUBO_FOR_TAGCOMMANDER_ENABLED": false,
        "GA_FOR_MINUBO_ACCOUNT_ID": null,
        "IS_GTM_ENABLED": true,
        "ADD_GTM_MINUBO_VARS": true,
        "ADD_GTM_EMARSYS_VARS": false,
        "ADD_GTM_CRITEO_VARS": false,
        "ADD_GTM_COMMISSION_JUNCTION_VARS": false,
        "ADD_GTM_REMARKETING_VARS": false,
        "IS_RECAPTCHA_ENABLED": true,
        "RECAPTCHA_SITE_KEY": "6LeyKGsUAAAAALpur8_8ohxoyFk-SH50aD5aa0oZ",
        "RECAPTCHA_THEME": "light",
        "SITE_ID": "PhilippPleinEU",
        "initialPageSize": 20,
        "resultPageSize": 12,
        "loadPartPageSize": 10,
        "isPLPPostLoadEnabled": false,
        "GOOGLE_MAP_STYLES": "[\n    {\n        \"featureType\": \"all\",\n        \"elementType\": \"labels.text.fill\",\n        \"stylers\": [\n            {\n                \"saturation\": 36\n            },\n            {\n                \"color\": \"#000000\"\n            },\n            {\n                \"lightness\": 40\n            }\n        ]\n    },\n    {\n        \"featureType\": \"all\",\n        \"elementType\": \"labels.text.stroke\",\n        \"stylers\": [\n            {\n                \"visibility\": \"on\"\n            },\n            {\n                \"color\": \"#000000\"\n            },\n            {\n                \"lightness\": 16\n            }\n        ]\n    },\n    {\n        \"featureType\": \"all\",\n        \"elementType\": \"labels.icon\",\n        \"stylers\": [\n            {\n                \"visibility\": \"off\"\n            }\n        ]\n    },\n    {\n        \"featureType\": \"administrative\",\n        \"elementType\": \"geometry.fill\",\n        \"stylers\": [\n            {\n                \"color\": \"#000000\"\n            },\n            {\n                \"lightness\": 20\n            }\n        ]\n    },\n    {\n        \"featureType\": \"administrative\",\n        \"elementType\": \"geometry.stroke\",\n        \"stylers\": [\n            {\n                \"color\": \"#000000\"\n            },\n            {\n                \"lightness\": 17\n            },\n            {\n                \"weight\": 1.2\n            }\n        ]\n    },\n    {\n        \"featureType\": \"landscape\",\n        \"elementType\": \"geometry\",\n        \"stylers\": [\n            {\n                \"color\": \"#000000\"\n            },\n            {\n                \"lightness\": 20\n            }\n        ]\n    },\n    {\n        \"featureType\": \"poi\",\n        \"elementType\": \"geometry\",\n        \"stylers\": [\n            {\n                \"color\": \"#000000\"\n            },\n            {\n                \"lightness\": 21\n            }\n        ]\n    },\n    {\n        \"featureType\": \"road.highway\",\n        \"elementType\": \"geometry.fill\",\n        \"stylers\": [\n            {\n                \"color\": \"#000000\"\n            },\n            {\n                \"lightness\": 17\n            }\n        ]\n    },\n    {\n        \"featureType\": \"road.highway\",\n        \"elementType\": \"geometry.stroke\",\n        \"stylers\": [\n            {\n                \"color\": \"#000000\"\n            },\n            {\n                \"lightness\": 29\n            },\n            {\n                \"weight\": 0.2\n            }\n        ]\n    },\n    {\n        \"featureType\": \"road.arterial\",\n        \"elementType\": \"geometry\",\n        \"stylers\": [\n            {\n                \"color\": \"#000000\"\n            },\n            {\n                \"lightness\": 18\n            }\n        ]\n    },\n    {\n        \"featureType\": \"road.local\",\n        \"elementType\": \"geometry\",\n        \"stylers\": [\n            {\n                \"color\": \"#000000\"\n            },\n            {\n                \"lightness\": 16\n            }\n        ]\n    },\n    {\n        \"featureType\": \"transit\",\n        \"elementType\": \"geometry\",\n        \"stylers\": [\n            {\n                \"color\": \"#000000\"\n            },\n            {\n                \"lightness\": 19\n            }\n        ]\n    },\n    {\n        \"featureType\": \"water\",\n        \"elementType\": \"geometry\",\n        \"stylers\": [\n            {\n                \"color\": \"#000000\"\n            },\n            {\n                \"lightness\": 17\n            }\n        ]\n    }\n]",
        "GIFT_CERT_COD_DISABLED": false,
        "IS_IN_STORE_PICKUP_ENABLED": false,
        "STORE_LOCATOR_PIN": "https://www.plein.com/on/demandware.static/-/Sites/default/dw2cd4b885/white.png",
        "IS_ZIP_CODE_VALIDATION_ENABLED": false,
        "SITE_BRAND": "plein",
        "IS_ABANDONED_CART_ENABLED": false,
        "ABANDONED_CART_ID": null,
        "COUNTRY_LANGUAGE": "en",
        "IS_PRODUCT_CUSTOMIZATION_ENABLED": false,
        "HIDE_HEADER_PROMOTION": false,
        "GOOGLE_PLACES_CONFIG": "{\r\n  \"default\":{\r\n    \"number_first\":false,\r\n    \"state_province\":false,\r\n    \"enabled\":true\r\n  },\r\n  \"US\":{\r\n    \"number_first\":true,\r\n    \"state_province\":true\r\n  },\r\n  \"CA\":{\r\n    \"number_first\":true,\r\n    \"state_province\":true\r\n  },\r\n  \"UK\":{\r\n    \"number_first\":true,\r\n    \"state_province\":false\r\n  },\r\n  \"AU\":{\r\n    \"number_first\":true,\r\n    \"state_province\":false\r\n  },\r\n  \"CN\":{\r\n    \"enabled\":false\r\n  }\r\n}",
        "GOOGLE_PLACES_API_KEY": "AIzaSyCUANHX02bR7yYYGkYZlYEdz7QBawrNAaM"
    };
}());

(function () {
    window.SessionAttributes = {
        "SHOW_CAPTCHA": null
    };
    window.User = {
        "zip": null,
        "storeId": null
    };
}());

pageContext = {
    "title": "Storefront",
    "type": "storefront",
    "ns": "storefront",
    "userStatus": "guest",
    "currencyCode": "GBP",
    "countryCode": "GB",
    "customerGroups": ["COD EU", "CanSeeCrypto", "CanSeeFurniture", "CannotSeeTheParfum", "DDP",
        "Everyone", "LC-fs_ext", "No-eyewear", "Regcode", "UE", "Unregistered", "not-LC-ext_ddp"
    ],
    "region": "PhilippPleinEU",
    "userEmail": ""
};

var meta =
    "Discover our latest women, men and kids collection. Shop our fashion luxury handbags and shoes exclusively made in Italy. Shop on the Philipp Plein Official Website.";
var keywords = "Philipp Plein";

//<!--
/* <![CDATA[ */
function trackPage() {
    try {
        var trackingUrl =
            "https://www.plein.com/on/demandware.store/Sites-PhilippPleinEU-Site/en_GB/__Analytics-Start";
        var dwAnalytics = dw.__dwAnalytics.getTracker(trackingUrl);
        if (typeof dw.ac == "undefined") {
            dwAnalytics.trackPageView();
        } else {
            dw.ac.setDWAnalytics(dwAnalytics);
        }
    } catch (err) {};
}
/* ]]> */
// -->

! function (b, e, f, g, a, c, d) {
    b.fbq || (a = b.fbq = function () {
            a.callMethod ? a.callMethod.apply(a, arguments) : a.queue.push(arguments)
        }, b._fbq || (b._fbq = a), a.push = a, a.loaded = !0, a.version = "2.0", a.queue = [], c = e
        .createElement(f), c.async = !0, c.src = g, d = e.getElementsByTagName(f)[0], d.parentNode
        .insertBefore(c, d))
}(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
fbq("init", "348774535246268");
fbq("set", "agent", "tmgoogletagmanager", "348774535246268");
fbq("track", "PageView");

var ScarabQueue = ScarabQueue || [];
(function (a) {
    if (!document.getElementById(a)) {
        var b = document.createElement("script");
        b.id = a;
        b.src = "//cdn.scarabresearch.com/js/1E202520E0ABF25A/scarab-v2.js";
        a = document.getElementsByTagName("script")[0];
        a.parentNode.insertBefore(b, a)
    }
})("scarab-js-api");
var pageContext = window.pageContext,
    currentPage = pageContext.ns,
    pagecatDL = google_tag_manager["GTM-5RWX79"].macro(2) || "",
    catArrow = / > /gi,
    pagecat = pagecatDL.replace(catArrow, "\x3e"),
    email = google_tag_manager["GTM-5RWX79"].macro(3) || pageContext.userEmail || "",
    cartcontent = google_tag_manager["GTM-5RWX79"].macro(4),
    searchterm = google_tag_manager["GTM-5RWX79"].macro(5) || "",
    abandonedCartId = google_tag_manager["GTM-5RWX79"].macro(6) || "",
    productID, ecom = google_tag_manager["GTM-5RWX79"].macro(7) || {};

function getProductID() {
    var a = document.getElementById("pid");
    return a = !a && ecom.detail.product ? ecom.detail.product.id : a || ecom.detail.product ? a.attributes
        .value.value : ""
}
"" !== email && ScarabQueue.push(["setEmail", email]);
cartcontent && "orderconfirmation" !== currentPage && ScarabQueue.push(["cart", cartcontent]);
"" !== abandonedCartId && ScarabQueue.push(["tag", abandonedCartId]);
"product" === currentPage && ecom && (productID = getProductID(), ScarabQueue.push(["view", productID]));
"" !== searchterm && "search" === currentPage && ScarabQueue.push(["searchTerm", searchterm]);
pagecat && "" !== pagecat && ScarabQueue.push(["category", pagecat]);

function getDataLayerValue(a) {
    for (var b = 0; b < window.dataLayer.length; b++)
        if (window.dataLayer[b][a] && ("ecommerce" != a || "detail" in window.dataLayer[b][a] && "product" in
                window.dataLayer[b][a].detail || window.dataLayer[b][a] && "purchase" in window.dataLayer[b][a]
            )) return window.dataLayer[b][a];
    return ""
}
ecom = getDataLayerValue("ecommerce");

function purchaseEmarsysCommand(a, b, d) {
    if (void 0 === a || 0 === b.length || 0 === d) return null;
    for (var c = 0; c < b.length; c++) a.items.push({
        item: b[c].id,
        quantity: b[c].quantity,
        price: parseFloat((Number(ecom.purchase.products[c].price) / Number(d)).toFixed(2))
    });
    console.info("emarsys_purchase_command:");
    console.info(a);
    return a
}
if (ecom && ecom.purchase) {
    var emarsys_purchase_command = {
        orderId: ecom.purchase.actionField.id,
        items: []
    };
    if (0 < ecom.purchase.products.length) {
        var currency = ecom.purchase.products[0].currency,
            rate = 1;
        "EUR" !== currency && jQuery.ajax({
            url: "https://api.ratesapi.io/api/latest?base\x3dEUR\x26symbols\x3d" + currency,
            type: "GET",
            success: function (a) {
                rate = a.rates[currency]
            },
            error: function (a) {
                a = {
                    CHF: 1.139248,
                    USD: 1.117993,
                    RUB: 90,
                    GBP: .864237,
                    HKD: 8.771159,
                    EUR: 1,
                    KRW: 1306.811038,
                    CNY: 7.536359
                };
                void 0 !== a[currency] && (rate = a[currency])
            },
            async: !1
        });
        ScarabQueue.push(["cart", []]);
        ScarabQueue.push(["purchase", purchaseEmarsysCommand(emarsys_purchase_command, ecom.purchase.products,
            rate)])
    }
}
ScarabQueue.push(["go"]);

window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments)
}
gtag("js", new Date);
gtag("config", "AW-790071649");

(function (a, e, f, g, b, c, d, h) {
    a.ITCLKOBJ = b;
    a[b] = a[b] || function () {
        (a[b].q = a[b].q || []).push(arguments)
    };
    a[b].l = 1 * new Date;
    c = e.createElement(f);
    d = e.getElementsByTagName(f)[0];
    c.async = 1;
    c.src = g;
    d.parentNode.insertBefore(c, d)
})(window, document, "script", "https://analytics.webgains.io/clk.min.js", "ITCLKQ");
ITCLKQ("set", "internal.cookie", !0);
ITCLKQ("set", "internal.api", !0);
ITCLKQ("click");

window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments)
}
gtag("js", new Date);
gtag("config", "UA-17040912-1", {
    send_page_view: !1
});

window.criteo_q = window.criteo_q || [];
window.criteo_q.push({
    event: "setAccount",
    account: google_tag_manager["GTM-5RWX79"].macro(31)
}, {
    event: "setEmail",
    email: google_tag_manager["GTM-5RWX79"].macro(32)
}, {
    event: "setSiteType",
    type: google_tag_manager["GTM-5RWX79"].macro(33)
}, {
    event: "viewHome",
    tms: "gtm-criteo-2.0.0"
});