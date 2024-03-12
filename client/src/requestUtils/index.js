const SERVER_PORT = 'http://localhost:5000';

export async function makePostRequest({ url, reqBody, reqHeaders }) {
  try {
    const res = await fetch(SERVER_PORT + url, {
      method: "post",
      headers: reqHeaders || {"Content-Type": "application/json"},
      body: typeof reqBody === 'string' ? reqBody : JSON.stringify(reqBody),
    });
    return await res.json();
  } catch (error) {
    console.log({ error });
  }
}
