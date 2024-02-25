const CsrfToken = () => {
  const testCsrf = async () => {
    await fetch("http://127.0.0.1:8000/api-auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        username: "aa",
        password: "aa",
      }),
    });
  };

  testCsrf();
  function getCookie(name) {
    let cookieValue = null;

    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));

          break;
        }
      }
    }

    return cookieValue;
  }

  getCookie("csrftoken");
  console.log(document.cookie, "Hehhh");
  return <input type="hidden" name="csrfmiddlewaretoken" />;
};
export default CsrfToken;
