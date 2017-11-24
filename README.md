# fakewovn
----------
This is a library that provides a wovn.io like translation functionality on your website/page.

- __Feature:__

  This project make use of the [MutationObserver API](https://developer.mozilla.org/en/docs/Web/API/MutationObserver) to detect dynamic changes on the DOM elements, and extract the underlying text for translation. The backend translation service is provided by [MyMemory Translated.net](https://mymemory.translated.net).

- __Usage limits:__

  Please Refer to MyMemory Translated.net 's [Usage Limit Page](https://mymemory.translated.net/doc/usagelimits.php).

- __How to Start:__

  put it in your script folder and include it directly, just like how you include jquery:

        ```html
        <script src="://{SITE_URL}/lib.js" onload="fakewovn('en','ja')"></script>
        ```

  or use javascript for dynamic insertion:

        ```javascript
        var body = document.getElementsByTagName('body')[0];
        var script = document.createElement('script');
        script.src="://{SITE_URL}/lib.js";
        script.onload=(function(){fakewovn("en","ja")});
        body.appendChild(script);
        ```

  for quick test, you could start a python SimpleHTTPServer in this folder, and open `http://example.com` in browser:

        ```bash
        python -m SimpleHTTPServer
        ```

  in the page of `http://example.com`, paste the following in console:

        ```javascript
        var body = document.getElementsByTagName('body')[0];
        var script = document.createElement('script');
        script.src="http://localhost:8000/lib.js";
        script.onload=(function(){fakewovn("en","ja")});
        body.appendChild(script);
        ```

- __Supported Browsers:__

  For static page translation, all browsers should apply.
  For dynamic content translation:
    - Chrome:  18~
    - Edge: Yes
    - Firefox: 14~
    - Internet Explorer: 11~
    - Opera: 15~
    - Safari: 6.0~
    - Android: 4.4~
    - Chrome for Android: 18~
    - Firefox Mobile: 14.0~
    - IE Phone: 11(8.1)~
    - Opera Mobile: 15~
    - Safari Mobile: 6~
