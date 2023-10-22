// function to switch language of web page
let language_content =
      {
         "en": {
          "1": "How to play",
          "2": "How to play",
          "3": "If the color of the text is black then the answer is the background color",
          "4": "If the color of the text is not black then the answer is the text color",
          "5": "Play",
          "6": "Enter your name",
          "7": "Start"
      
         },
         "ar": {
          "1": "طريقة اللعب",
          "2": "طريقة اللعب",
          "3": " اذا كان لون النص اسود فان الاجابة الصحيحة هي لون الخلفية",
          "4": "اذا لم يكن لون النص اسود فان الاجابة هي لون النص",
          "5": "العب",
          "6": "ادخل اسمك",
          "7": "ابدا"
         }
      }
      
      function changeLanguage(lang) {
         for (let key in language_content[lang]) {
            document.getElementById(key).innerHTML = language_content[lang][key];
         }
       }
