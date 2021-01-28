$('document').ready(function() {
    var content = $('.content');
    var loadingSpinner = $('#loading');
    var explorer = new Box.ContentExplorer();

    content.css('display', 'block');
    loadingSpinner.css('display', 'none');

    var homeView = $('#home-view');
    var helpView = $('#help-view');
    var uploaderDiv = $('#explorer');
    var tokenExpiredDiv = $('#token-expired');
    var expiration = $('#expiration');
  
    function showHome() {
      homeView.css('display', 'inline-block');
      helpView.css('display', 'inline-block');
    }

    function isAuthenticated() {
      // Check whether the current time is past the access token's expiry time
      var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }
  
    function updateView() {
      if (isAuthenticated()) {
        var boxFolder = localStorage.getItem('boxFolder');
        var boxToken = localStorage.getItem('boxToken');
        var expiresAt = new Date(
          JSON.parse(localStorage.getItem('expires_at'))
        );
        var lang = document.documentElement.lang;
        var locale = {
          'en': 'en-US',
          'es': 'es-ES'
        }[lang]
        
        showHome();
      	explorer.show(boxFolder, boxToken, {
            container: '#explorer',
            autoFocus: true
        });

        expiration.text(
          expiresAt.toLocaleDateString(locale, {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timeZone: 'US/Eastern',
            timeZoneName: 'short'
          })
        );

      } else {
        // explorer.hide()
        // explorer.clearCache();
        tokenExpiredDiv.css('display', 'block');
      }
    }
  
    function parseURL() {
      var params = new URLSearchParams(window.location.search);
      var boxAccessToken = params.get('access_token');
      var folderId = params.get('folder_id');
      var expiresAt = params.get('expires_at');
      localStorage.setItem("boxToken", boxAccessToken);
      localStorage.setItem("boxFolder", folderId);
      localStorage.setItem('expires_at', expiresAt);
    }

    parseURL();
    updateView();
  });
  