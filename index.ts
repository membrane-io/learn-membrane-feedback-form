import { nodes } from "membrane";

export async function endpoint(req) {
  switch (req.method) {
    case "GET":
      return JSON.stringify({
        status: 200,
        headers: { "Content-Type": "text/html" },
        body: getFormHtml(),
      });
    case "POST":
      const params = new URLSearchParams(req.body);
      const email = params.get("email");
      const feedback = params.get("feedback");

      const subject = `Feedback on Membrane from ${email}`;
      await nodes.email.send({ subject, body: `${feedback}` });

      return JSON.stringify({
        status: 200,
        headers: { "Content-Type": "text/plain" },
        body: "Feedback received - thanks!",
      });
    default:
      return { status: 405, body: "Method not allowed" };
  }
}

function getFormHtml() {
  return `
    <!DOCTYPE html>
    <html lang="en" style="${HTML_STYLES}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Membrane Getting Started Feedback</title>
    </head>
      <body style="${BODY_STYLES}">
        <main>
          <form method="POST" action="https://tea-686-match-648-show-976-cut.hook.membrane.io" style="${FORM_STYLES}">
            <input type="email" id="email" name="email" placeholder="Email" required style="${INPUT_STYLES}" />
            <textarea id="feedback" name="feedback" placeholder="Feedback" required rows="8" style="${INPUT_STYLES}"></textarea>
            <button style="${BUTTON_STYLES}">Submit</button>
          </form>
        </main>
      </body>
    </html>
  `;
}

const HTML_STYLES = `
  box-sizing: border-box;
  height: 100vh;
`;

const BODY_STYLES = `
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: MonoRegular, Inconsolata, Consolas, Monaco, monospace;
  background:
    radial-gradient(#d4c9c9 1px, transparent 1px),
    radial-gradient(#d4c9c9 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
`;

const FORM_STYLES = `
  width: 300px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #f4f4f4;
  border: 1px solid #999;
  box-shadow: 4px 4px 0px 0px #000;
`;

const INPUT_STYLES = `
  padding: 4px;
  resize: vertical;
  border-top: 2px solid #000;
  border-left: 2px solid #000;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  font-family: MonoRegular, Inconsolata, Consolas, Monaco, monospace;
`;

const BUTTON_STYLES = `
  width: 50%;
  margin: 0 auto;
  padding: 8px;
  background-color: #fff;
  border: 1px solid #000;
  box-shadow: 4px 4px 0px 0px #000;
  text-transform: uppercase;
  font-family: MonoRegular, Inconsolata, Consolas, Monaco, monospace;
  font-weight: bold;
  cursor: pointer;
`;
