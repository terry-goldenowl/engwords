$(document).ready(function () {
  $("#result").addClass("hidden");
  $("#noResult").addClass("hidden");

  $("#search").on("submit", (e) => {
    e.preventDefault();
    const wordToSearch = $("#wordInput").val();
    if (!wordToSearch) return;
    $.get("https://api.dictionaryapi.dev/api/v2/entries/en/" + wordToSearch)
      .done(function (data, status) {
        $("#noResult").addClass("hidden");
        $("#result").removeClass("hidden");

        $("#name").text(data[0].word);

        $("#pronounciations").html(
          data[0].phonetics
            .map(
              (phonetic) => `
              <div class="flex gap-1">
            <p class="text-xl">${phonetic.text}</p>
            <button class="speaker">
                <i class="fas fa-volume-up"></i>
            </button>
            <audio>
                <source id="audioMp3" src="${phonetic.audio}" type="audio/mpeg">
            </audio>
            </div>
          `
            )
            .join("")
        );

        // const phoneticMatched = data[0].phonetics.find(
        //   (phonetic) => phonetic.text === data[0].phonetic
        // );
        // $("#audio").attr("src", phoneticMatched.audio);
        // console.log($("#audio").attr("src"));

        $("#meaning").html(
          data[0].meanings.map(
            (meaning) => `<p class="font-bold text-blue-600">${
              meaning.partOfSpeech
            }</p>
            <div class="mt-2">
                ${meaning.definitions
                  .map(
                    (defi, index) => `<div class="flex gap-3 items-center mb-1">
                    <div class="bg-green-500 rounded-xl w-8 h-8 flex justify-center items-center mb-2 shrink-0">${
                      index + 1
                    }</div>
                    <div>
                        <p>${defi.definition}</p>
                        <p class="italic text-md text-gray-500"> <span> ${
                          defi.example ? "Example:" : ""
                        } </span> ${defi.example || "No example provided"}</p>
                    </div>
                </div>`
                  )
                  .join("")}
            </div>`
          )
        );

        $(".speaker").on("click", function () {
          $(this).next()[0].play();
        });
      })
      .fail(function (e) {
        $("#result").addClass("hidden");
        $("#noResult").removeClass("hidden");

        $("#notification").text(
          "Sorry! We can not find the definitions for the word you are looking for."
        );
      });
  });

  $("#saveBtn").click(function () {
    console.log("clicked");
    $("#saveBtn").children("i").eq(0).toggleClass("far fas");

    //   store word to save in the database

    //   show notification
      
  });
});
