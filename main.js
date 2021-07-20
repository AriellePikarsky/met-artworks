/*
 * Artwork fields:      
 * - objectID
 * - title
 * - artistDisplayName
 * - medium
 * - period
 * - primaryImage
 * - dimensions
 * - artistDisplayBio
 * - department
 * - primaryImageSmall
 * - isHighlight
 */

// Counts how many artworks were added, to determine which column to put the next artwork in.
let artworkCounter = 0;

function createArtElement(artworkData) {
    const div = document.createElement('div');

    div.innerHTML = `
        <div class='card-header'>
        
        <button class='remove-artwork'>X</button>
        <h3>${artworkData.title}</h3>
        </div>
        <div class ='img-container'>
            <img src="${artworkData.primaryImage}"/>
        </div>
        <p>${artworkData.artistDisplayName}, ${artworkData.objectDate}</p>
        
    `


    div.classList.add('artwork-card')
    const removeButton = div.querySelector('button.remove-artwork');
    removeButton.onclick = () => {
        div.remove();
        artworkCounter--;
    };

    return div;
}

const artIndexInput = document.getElementById('art-index-input');
const indexRange = document.getElementById('index-range');
const submitButton = document.getElementById('submit');
const container = document.getElementById('art-container');
const artColumns = container.children;

const randomButton = document.getElementById('random');
const scrollButton = document.getElementById('scroll-up');

fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&isHighlight=true&q=""')
    .then(res => res.json())
    .then(data => {
        console.log('data loaded', data);
        objectIds = data.objectIDs;

        artIndexInput.disabled = false;
        submitButton.disabled = false;
        indexRange.classList.remove('hidden');
        indexRange.innerText = `between 1 and ${objectIds.length}`;
    });



const getAndDisplayArtData = (artId) => {
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artId}`)
        .then(res => res.json())
        .then(data => {
            return {
                objectID: data.objectID,
                isHighlight: data.isHighlight,
                primaryImage: data.primaryImage,
                department: data.department,
                title: data.title,
                artistDisplayName: data.artistDisplayName,
                artistDisplayBio: data.artistDisplayBio,
                medium: data.medium,
                objectDate: data.objectDate
            }
        })
        .then(artwork => {
            const artElement = createArtElement(artwork);
            artColumns[artworkCounter % 3].appendChild(artElement);
            artworkCounter++;
            return artElement;
           
        })
        .then(artElement => {
            artElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        })
}


submitButton.onclick = () => {
    const artIndex = parseInt(artIndexInput.value);

    if (isNaN(artIndex) || artIndex > objectIds.length || artIndex <= 0) {
        window.alert('Invalid art index!!! :(');
        return;
    }

    const artId = objectIds[artIndex - 1];
    console.log(artId);
    getAndDisplayArtData(artId);
}

randomButton.onclick = () => {
    const randomArtIndex = Math.floor(Math.random() * objectIds.length);
    const artId = objectIds[randomArtIndex];
    getAndDisplayArtData(artId);
}

scrollButton.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.onscroll = () => {
    if (window.scrollY > 100) {
        scrollButton.classList.remove('invisible');
    }
    else {
        scrollButton.classList.add('invisible')
    }
}