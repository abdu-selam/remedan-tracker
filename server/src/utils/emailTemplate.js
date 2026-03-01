const verifyEmail = (data) => {
  const name = data.name;
  const token = data.token;
  const year = new Date().getFullYear();

  return `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify your email</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #020b12;
      font-family: system-ui, sans-serif, Arial;
    "
  >
    <div style="font-family: system-ui, sans-serif, Arial">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding: 24px 12px">
            <table
              cellpadding="0"
              cellspacing="0"
              style="
                max-width: 600px;
                width: 100%;
                background: rgba(227, 244, 242, 0.1);
                border: 1px solid #e3f4f2;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 0px 16px #e3f4f280;
              "
            >
              <tr>
                <td
                  style="
                    background: #e3f4f2;
                    color: #020b12;
                    padding: 24px 24px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                  "
                >
                  <h1 style="margin: 0; font-size: 22px">Verify your email</h1>
                  <p
                    style="
                      margin: 6px 0 0;
                      font-size: 14px;
                      opacity: 0.9;
                      text-align: center;
                    "
                  >
                    You received email verification code!
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding: 24px; color: #e3f4f2">
                  <p
                    style="
                      margin: 0 0 8px;
                      font-size: 18px;
                      font-weight: 700;
                      text-align: center;
                    "
                  >
                    Hello ${name}
                  </p>

                  <p
                    style="
                      margin: 0 0 8px;
                      font-size: 14px;
                      line-height: 1.2;
                      text-align: center;
                    "
                  >
                    Assalamu Alaikum wa Rahmatullahi wa Barakatuh,
                  </p>

                  <p
                    style="
                      margin: 0 0 24px;
                      font-size: 12px;
                      line-height: 1.4;
                      text-align: center;
                      max-width: 400px;
                      margin-inline: auto;
                      background: #e3f4f217;
                      padding: 0.4rem;
                      border-radius: 10px;
                    "
                  >
                    Thank you for creating an account with Abidin Tracker. We pray it helps you grow closer to Allah and stay consistent in your worship.
                  </p>

                  <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    style="margin-bottom: 24px"
                  >
                    <tr
                      style="
                        display: flex;
                        border-radius: 10px;
                        background-color: #e3f4f233;
                        padding: 5px;
                      "
                    >
                      <td
                        style="
                          margin-inline: auto;
                          color: #f4f6f8;
                          width: max-content;
                          border-radius: 8px;
                          display: flex;
                          gap: 0.3rem;
                        "
                      >
                        <p
                          style="
                            border-radius: 8px;
                            background: #020b12;
                            padding: 0.5rem 0.5rem;
                            font-size: 20px;
                          "
                        >
                          ${token[0]}
                        </p>
                        <p
                          style="
                            border-radius: 8px;
                            background: #020b12;
                            padding: 0.5rem 0.5rem;
                            font-size: 20px;
                          "
                        >
                          ${token[1]}
                        </p>
                        <p
                          style="
                            border-radius: 8px;
                            background: #020b12;
                            padding: 0.5rem 0.5rem;
                            font-size: 20px;
                          "
                        >
                          ${token[2]}
                        </p>
                        <p
                          style="
                            border-radius: 8px;
                            background: #020b12;
                            padding: 0.5rem 0.5rem;
                            font-size: 20px;
                          "
                        >
                          ${token[3]}
                        </p>
                        <p
                          style="
                            border-radius: 8px;
                            background: #020b12;
                            padding: 0.5rem 0.5rem;
                            font-size: 20px;
                          "
                        >
                          ${token[4]}
                        </p>
                        <p
                          style="
                            border-radius: 8px;
                            background: #020b12;
                            padding: 0.5rem 0.5rem;
                            font-size: 20px;
                          "
                        >
                          ${token[5]}
                        </p>
                      </td>
                    </tr>
                  </table>

                  <div style="margin-bottom: 24px">
                    <p style="margin: 0 0 8px; color: #de2831; font-weight: bold">⚠ Warning</p>
                    <div
                      style="
                        background: #f9fafb;
                        border-left: 4px solid #de2831;
                        padding: 16px;
                        border-radius: 4px;
                        font-size: 12px;
                        line-height: 1.6;
                        box-shadow: 0 0 8px #de2831;
                        color: #de2831;
                        font-weight: 700;
                      "
                    >
                      For your security, this verification code will expire in
                      12 hours. Please complete the verification before it
                      expires. 
                    </div>
                  </div>
                </td>
              </tr>

              <tr>
                <td
                  style="
                    background: #f9fafb;
                    text-align: center;
                    padding: 16px;
                    font-size: 12px;
                    color: #020b12de;
                    font-weight: bolder;
                  "
                >
                  &copy; ${year} Abidin. All rights reserved.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
`;
};

const forgotEmail = (data) => {
  const name = data.name;
  const token = data.token;
  const year = new Date().getFullYear();

  return `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify your email</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #020b12;
      font-family: system-ui, sans-serif, Arial;
    "
  >
    <div style="font-family: system-ui, sans-serif, Arial">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding: 24px 12px">
            <table
              cellpadding="0"
              cellspacing="0"
              style="
                max-width: 600px;
                width: 100%;
                background: rgba(227, 244, 242, 0.1);
                border: 1px solid #e3f4f2;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 0px 16px #e3f4f280;
              "
            >
              <tr>
                <td
                  style="
                    background: #e3f4f2;
                    color: #020b12;
                    padding: 24px 24px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                  "
                >
                  <h1 style="margin: 0; font-size: 22px">Account Security Reminder</h1>
                  <p
                    style="
                      margin: 6px 0 0;
                      font-size: 14px;
                      opacity: 0.9;
                      text-align: center;
                    "
                  >
                    You received password reset code!
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding: 24px; color: #e3f4f2">
                  <p
                    style="
                      margin: 0 0 8px;
                      font-size: 18px;
                      font-weight: 700;
                      text-align: center;
                    "
                  >
                    Hello ${name}
                  </p>

                  <p
                    style="
                      margin: 0 0 8px;
                      font-size: 14px;
                      line-height: 1.2;
                      text-align: center;
                    "
                  >
                    Assalamu Alaikum wa Rahmatullahi wa Barakatuh,
                  </p>

                  <div style="margin-bottom: 24px">
                    <p style="margin: 0 0 8px; color: #de2831; font-weight: bold">⚠ Warning</p>
                    <div
                      style="
                        background: #f9fafb;
                        border-left: 4px solid #de2831;
                        padding: 16px;
                        border-radius: 4px;
                        font-size: 12px;
                        line-height: 1.6;
                        box-shadow: 0 0 8px #de2831;
                        color: #de2831;
                        font-weight: 700;
                      "
                    >
                      This message was sent in response to a request made using your email address. If this was not you, please disregard this email. Your account remains secure, and no changes will occur without verification.
                    </div>
                  </div>

                  <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    style="margin-bottom: 24px"
                  >
                    <tr
                      style="
                        display: flex;
                        border-radius: 10px;
                        background-color: #e3f4f233;
                        padding: 5px;
                      "
                    >
                      <td
                        style="
                          margin-inline: auto;
                          color: #f4f6f8;
                          width: max-content;
                          border-radius: 8px;
                          display: flex;
                          gap: 0.3rem;
                        "
                      >
                        <p
                          style="
                            border-radius: 8px;
                            background: #020b12;
                            padding: 0.5rem 0.5rem;
                            font-size: 20px;
                          "
                        >
                          ${token[0]}
                        </p>
                        <p
                          style="
                            border-radius: 8px;
                            background: #020b12;
                            padding: 0.5rem 0.5rem;
                            font-size: 20px;
                          "
                        >
                          ${token[1]}
                        </p>
                        <p
                          style="
                            border-radius: 8px;
                            background: #020b12;
                            padding: 0.5rem 0.5rem;
                            font-size: 20px;
                          "
                        >
                          ${token[2]}
                        </p>
                        <p
                          style="
                            border-radius: 8px;
                            background: #020b12;
                            padding: 0.5rem 0.5rem;
                            font-size: 20px;
                          "
                        >
                          ${token[3]}
                        </p>
                        <p
                          style="
                            border-radius: 8px;
                            background: #020b12;
                            padding: 0.5rem 0.5rem;
                            font-size: 20px;
                          "
                        >
                          ${token[4]}
                        </p>
                        <p
                          style="
                            border-radius: 8px;
                            background: #020b12;
                            padding: 0.5rem 0.5rem;
                            font-size: 20px;
                          "
                        >
                          ${token[5]}
                        </p>
                      </td>
                    </tr>
                  </table>
<p
                    style="
                      margin: 0 0 24px;
                      font-size: 12px;
                      line-height: 1.4;
                      text-align: center;
                      max-width: 400px;
                      margin-inline: auto;
                      background: #e3f4f217;
                      padding: 0.4rem;
                      border-radius: 10px;
                    "
                  >
                    For your security, this code is valid for 6 hours only. After it expires, it cannot be used and you will need to request a new one.
                  </p>
                </td>
              </tr>

              <tr>
                <td
                  style="
                    background: #f9fafb;
                    text-align: center;
                    padding: 16px;
                    font-size: 12px;
                    color: #020b12de;
                    font-weight: bolder;
                  "
                >
                  &copy; ${year} Abidin. All rights reserved.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
`;
};

module.exports = { verifyEmail, forgotEmail };
