'use strict';

// TODO: USE CONFIG
const hostname = '';


module.exports = data => `
<html>
<head>
    <title>Tipit TV</title>
</head>
<body style="margin: 0;font-family:Helvetica,Arial,sans-serif;color:#5c5c5c;background:#fafafa;padding-top: 20px;padding-left:20px;">
  <div style='max-width:460px;margin: 0 auto;border-radius: 10px'>
    <div style='text-align:center;padding-bottom:55px;background:#ffffff;border-radius: 3px 3px 0 0;border-left: 1px solid #EDEDED;border-right: 1px solid #EDEDED;border-top: 1px solid #EDEDED;'>
        <a href='https://tipit.tv/' target='blanc'>
          <img style='display:inline-block;margin-top:60px' src="https://tipit.tv/assets/img/icons/mail-tipit.png" width='41px'>
        </a>
        <div style='color: #5c5c5c;font-size:22px;margin-top:40px'>To reset your password please follow the link below:</div>
        <div style='color: #5c5c5c;font-size:22px;margin-bottom: 20px;'><a href="https://tipit.tv/reset-password?code=${data.details.verificationCode}">Reset password.</a></div>
    </div>

    <div style='padding:31px 20px 34px;background: #3a3a3a;text-align:center;border-radius:0 0 3px 3px'>ng builf
      <div style='margin-bottom:16px;color: #a2a2a2;font-size:13px'>STAY CONNECTED</div>
      <div>
        <div style='display:inline-block;margin-right:7px'>
          <a href="https://www.facebook.com/tipit.tv/" target='blanc'>
            <img width='18px' height="18px" src="https://tipit.tv/assets/img/icons/mail-facebook.png" alt="facebook">
          </a>
        </div>
        <div style='display:inline-block;margin-right:7px'>
          <a href="https://www.linkedin.com/company-beta/4839343/" target='blanc'>
            <img width='18px' height="18px" src="https://tipit.tv/assets/img/icons/mail-linkedin.png" alt="linkedin">
          </a>
        </div>
        <div style='display:inline-block;margin-right:7px'>
          <a href="https://twitter.com/tipitinc" target='blanc'>
            <img width='18px' height="18px" src="https://tipit.tv/assets/img/icons/mail-twitter.png" alt="twitter">
          </a>
        </div>
        <div style='display:inline-block;'>
          <a href="https://www.instagram.com/model.photoapp/" target='blanc'>
            <img width='18px' height="18px" src="https://tipit.tv/assets/img/icons/mail-instagram.png" alt="instagram">
          </a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;