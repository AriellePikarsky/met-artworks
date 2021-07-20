// Creates and returns an HTML element displaying the artwork's data.
function createArtElement(artwork) {
    const div = document.createElement('div');
    
    const title = document.createElement('h3');
    title.innerText = artwork.name;
    div.appendChild(title)
    
    const idP = document.createElement('p');
    idP.innerText = '#' + artwork.id;
    div.appendChild(idP);
    
    const createDateP = document.createElement('p');
    createDateP.innerText = artwork.additionDate.toISOString();
    div.appendChild(createDateP);

    const img = document.createElement('img');
    img.src = artwork.src;
    div.appendChild(img)

    div.classList.add('art')

    return div;
}