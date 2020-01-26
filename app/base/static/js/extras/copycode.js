  function copyCode() {
      /* Get the text field */
      var copyText = document.getElementById("api-token");

      /* Select the text field */
      copyText.select();

      /* Copy the text inside the text field */
      document.execCommand("copy");

      /* Give a response */
      //document.getElementById("copy-response").innerHTML = "Code copied to clipboard!";

      /* Alert the copied text */
      alert("Copied the text: " + copyText.value);
    }
