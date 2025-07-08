function addWellcomeCard(params = {}) {
  const template = document.querySelector("#wellcome-template");
  const container = document.querySelector(".wellcome-section");
  
  const clone = template.content.cloneNode(true);
  

  clone.querySelector(".wellcome_greeting").textContent = params.title;
  clone.querySelector(".wellcome_name").textContent = params.subtitle;

  const imageContainer = clone.querySelector(".image-container");
  params.images.forEach((url, index) => {
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Imagen del trabajo";
    img.classList.add("image");
    if (index === 0) img.classList.add("main-image");
    if (index === 1) img.classList.add("shadow");
    imageContainer.appendChild(img);
  });

  container.appendChild(clone);
}

function addAboutMeCard(data) {
  const template = document.querySelector("#aboutme-template");
  const container = document.querySelector(".aboutme_container");

  data.forEach(item => {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".aboutme_title").textContent = item.title;
    clone.querySelector(".aboutme_text").textContent = item.info;

    const imageContainer = clone.querySelector(".aboutme_image-container");
    if (item.image) {
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.title;
      imageContainer.appendChild(img);
      img.classList.add("aboutMe_image");
    }

    container.appendChild(clone);
  });
}




    function getWellcome() {
    return fetch("https://cdn.contentful.com/spaces/v6c1fbdlfexr/environments/master/entries?access_token=RGH9hW9lv2jxh35PfA7QlMr_imVRYiYUM0HfIzWxmdQ&content_type=wellcome")
    .then(res => res.json())
    .then((data) => {
      return data.items.map((item) => {
        const title = item.fields.tittle;

        let subtitle = "";
        try {
          subtitle = item.fields.subtitle.content[0].content[0].value;
        } catch (e) {
          subtitle = "[sin subtítulo]";
        }

        const imageUrls = item.fields.image
          .map(img => {
            const id = img.sys.id;
            const asset = data.includes.Asset.find(asset => asset.sys.id === id);
            return asset ? "https:" + asset.fields.file.url : null;
          })
          .filter(Boolean); 

        return {
          title,
          subtitle,
          images: imageUrls,
        };
      });
    });
}

  function getAboutMe() {
  return fetch("https://cdn.contentful.com/spaces/v6c1fbdlfexr/environments/master/entries?access_token=tLSsmmsYjs6TIrtXq_WgLnEdONYkRAP24ll9FHofgEQ&content_type=aboutMe")
    .then(res => res.json())
    .then((data) => {
      const assets = data.includes?.Asset || [];

      
      const aboutMeItems = data.items.map((item) => {
        const title = item.fields.aboutMeTitle || "[Sin título]";
        const info = item.fields.aboutMeInfo || "[Sin información]";

        
        let imageUrl = null;
        const imageId = item.fields.aboutMeImage?.sys?.id;
        if (imageId) {
          const asset = assets.find(a => a.sys.id === imageId);
          if (asset) {
            imageUrl = "https:" + asset.fields.file.url;
          }
        }

        return {
          title,
          info,
          image: imageUrl,
        };
      });

      return aboutMeItems;
    });
} 

function main() {

  getWellcome().then(function(works){
        for(const w of works){
            addWellcomeCard(w);
        }
    });

  getAboutMe().then(function(aboutMeItems){
        addAboutMeCard(aboutMeItems);
  });  
}

main();