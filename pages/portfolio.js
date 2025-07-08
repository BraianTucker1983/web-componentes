function addPortfolioWellcome(params = {}) {
  const template = document.querySelector("#portfolio-template");
  const container = document.querySelector(".portfolio-section");

  const clone = template.content.cloneNode(true);

  
  clone.querySelector(".portfolio_title1").textContent = params.title1 || "[Sin título 1]";
  clone.querySelector(".portfolio_title2").textContent = params.title2 || "[Sin título 2]";
  const imageContainer = clone.querySelector(".image-container");

  params.images.forEach((url, index) => {
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Imagen del portfolio";
    img.classList.add("image");
    if (index === 0) img.classList.add("main-image");
    if (index === 1) img.classList.add("shadow");
    imageContainer.appendChild(img);
  });

  container.appendChild(clone);
}

function getPortfolioWellcome() {
  return fetch("https://cdn.contentful.com/spaces/v6c1fbdlfexr/environments/master/entries?access_token=RGH9hW9lv2jxh35PfA7QlMr_imVRYiYUM0HfIzWxmdQ&content_type=portfolio")
    .then(res => res.json())
    .then(data => {
      
      console.log("Portfolio Contentful data:", data);

      return data.items.map(item => {
        const title1 = item.fields.portfolioTitle || "[Sin título 1]";
        const title2 = item.fields.portfolioTitle2 || "[Sin título 2]";

        const imgMainId = item.fields.portfolioImg?.sys?.id;
        const imgShadowId = item.fields.portfolioShadow?.sys?.id;

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



function addWorksCard(params = {}) {
  const template = document.querySelector("#works-template");
  const container = document.querySelector(".works_container");

  
  template.content.querySelector(".works_title").textContent = params.title;
  template.content.querySelector(".works_text").textContent = params.description;

  const imgContainer = template.content.querySelector(".works_image-container");
  imgContainer.innerHTML = ""; 
  const img = document.createElement("img");
  img.src = params.image;
  img.alt = params.title;
  img.classList.add("works_image");
  imgContainer.appendChild(img);

  const clone = document.importNode(template.content, true);
  container.appendChild(clone);
}

function getWorks() {
  return fetch(
    "https://cdn.contentful.com/spaces/v6c1fbdlfexr/environments/master/entries?access_token=x7g9CfV4cxdo-Mg8epKRkpuyaCbS1zYNxK7_EaxFf2s&content_type=woksdesafio"
  )
    .then(res => res.json())
    .then(data => {
      return data.items.map(item => {
        const imageId = item.fields.worksimage?.sys?.id;
        const asset = data.includes.Asset.find(asset => asset.sys.id === imageId);
        const imageUrl = asset ? "https:" + asset.fields.file.url : "";

        return {
          title: item.fields.workstitle,
          description: item.fields.worksinfo,
          image: imageUrl,
          url: "#",  
        };
      });
    });
}

function main() {
  getPortfolioWellcome().then(function(portfolioItems){
    portfolioItems.forEach(addPortfolioWellcome);
  });

  getWorks().then((works) => {
    const titlesToShow = [
      "Mi trabajo 1",
      "Mi trabajo 2",
      "Mi trabajo 3"
    ];

    const orderedWorks = titlesToShow
      .map(title => works.find(item => item.title === title))
      .filter(Boolean);

    orderedWorks.forEach(addWorksCard);
  });
}

main();
