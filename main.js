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

// const example = {
//     objectID: 681246,
//     isHighlight: true,
//     primaryImage: "https://images.metmuseum.org/CRDImages/li/original/i19546750-cf.jpg",
//     department: "The Libraries",
//     title: "L'office de l'Église en françois contenant les offices pour toute l'année, plusieurs prières tirées de l'écriture-sainte \u0026 des saints pères, les hymnes en vers françois, avec une instruction pour les fidèles",
//     artistDisplayName: "Catholic Church",
//     artistDisplayBio: "",
//     medium: "",
//     objectDate: "1792"
// }
// const example2 = {
//     objectID: 202614,
//     isHighlight: true,
//     primaryImage: "https://images.metmuseum.org/CRDImages/es/original/DP162240.jpg",
//     department: "European Sculpture and Decorative Arts",
//     objectName: "Statue",
//     title: "Winter",
//     artistDisplayName: "Jean Antoine Houdon",
//     artistDisplayBio: "French, Versailles 1741–1828 Paris",
//     objectDate: "1787"
// }


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
    return div;
}


// let objectIds = [];

const artIndexInput = document.getElementById('art-index-input');
const indexRange = document.getElementById('index-range');
const submitButton = document.getElementById('submit');
const container = document.getElementById('art-container');
const randomButton = document.getElementById('random');
const scrollButton = document.getElementById('scroll-up');
// const removeArtwork = document.getElementsByClassName('remove-artwork');

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

// const displayedArt = [];

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
            // displayedArt.push(artwork.objectID);
            const artElement = createArtElement(artwork);
            container.appendChild(artElement);
            // artElement.setAttribute("class", `${objectID}`);
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



// removeArtwork.onclick = () => {
//     console.log('tftfufuf');

//     // document.removeChild(artElement.objectID);
    
//     // console.log(hhhhhhh);
//     // const removeArtworkFunc = (objectID) => {
//     //     const artCard = document.getElementsByClassName(objectID);
//     //     artCard.remove();
//     // }
//     // removeArtworkFunc(removeArtwork.objectID);

// }

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