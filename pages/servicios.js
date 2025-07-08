function addServicesWellcome(params = {}) {
  const template = document.querySelector("#servicesWellcome-template");
  const container = document.querySelector(".servicesWellcome-section");

  const clone = template.content.cloneNode(true);

  
  clone.querySelector(".servicesWellcome_title1").textContent = params.title1 || "[Sin título 1]";
  clone.querySelector(".servicesWellcome_title2").textContent = params.title2 || "[Sin título 2]";
  const imageContainer = clone.querySelector(".image-container");

  params.images.forEach((url, index) => {
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Imagen del servicesWellcome";
    img.classList.add("image");
    if (index === 0) img.classList.add("main-image");
    if (index === 1) img.classList.add("shadow");
    imageContainer.appendChild(img);
  });

  container.appendChild(clone);
}

function getServicesWellcome() {
  return fetch("https://cdn.contentful.com/spaces/v6c1fbdlfexr/environments/master/entries?access_token=RGH9hW9lv2jxh35PfA7QlMr_imVRYiYUM0HfIzWxmdQ&content_type=servicesWellcome")
    .then(res => res.json())
    .then(data => {      

      return data.items.map(item => {
        const title1 = item.fields.servicesTitle || "[Sin título 1]";
        const title2 = item.fields.servicesTitle2 || "[Sin título 2]";

        const imgMainId = item.fields.servicesImg?.sys?.id;
        const imgShadowId = item.fields.servicesShadow?.sys?.id;

        const imageUrls = [imgMainId, imgShadowId]
          .map(id => {
            const asset = data.includes.Asset.find(asset => asset.sys.id === id);
            return asset ? "https:" + asset.fields.file.url : null;
          })
          .filter(Boolean);

        return {
          title1,
          title2,
          images: imageUrls,
        };
      });
    });
}

function addServicesCard(data) {
  const template = document.querySelector("#services-template");
  const container = document.querySelector(".services_container");

  data.forEach(item => {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".services_title").textContent = item.title;
    clone.querySelector(".services_text").textContent = item.info;

    const imageContainer = clone.querySelector(".services_image-container");

    item.images.forEach(url => {
      const img = document.createElement("img");
      img.src = url;
      img.alt = item.title;
      img.classList.add("services_image");
      imageContainer.appendChild(img);
    });

    container.appendChild(clone);
  });
}

function getServices() {
  return fetch("https://cdn.contentful.com/spaces/v6c1fbdlfexr/environments/master/entries?access_token=tLSsmmsYjs6TIrtXq_WgLnEdONYkRAP24ll9FHofgEQ&content_type=services")
    .then(res => res.json())
    .then((data) => {
      const assets = data.includes?.Asset || [];

      return data.items.map((item) => {
        const title = item.fields.title || "[Sin título]";
        const info = item.fields.servicesInfo || "[Sin información]";

        
        const imageIds = item.fields.servicesImages?.map(img => img.sys.id) || [];

        
        const imageUrls = imageIds.map(id => {
          const asset = assets.find(a => a.sys.id === id);
          return asset ? (
          asset.fields.file.url.startsWith("http")
          ? asset.fields.file.url
          : "https:" + asset.fields.file.url
    ) : null;
        }).filter(Boolean);

        return {
          title,
          info,
          images: imageUrls,
        };
      });
    });
}

function main() { 
  getServicesWellcome().then(wellcomeItems => {
    wellcomeItems.forEach(addServicesWellcome);
  });
 
  
  getServices().then(servicesItems => {
    
    const titlesToShow = [
      "Rudimentos",
      "Ritmos de Metal/Rock/Funk",
      "Tecnica de doble pedal"
    ];

    const orderedServices = titlesToShow.map(title =>
    servicesItems.find(item => item.title === title)
  ).filter(Boolean);

    addServicesCard(orderedServices);
  });
  
}


main();