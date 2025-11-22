//Declaration of variables
const contentBox = document.querySelector('.content')
const refresh = document.querySelector('.refresh')

async function fetchNewTokens() {
  const response = await fetch('https://api.dexscreener.com/token-profiles/latest/v1', {
    method: 'GET',
    headers: {
      "Accept": "*/*"
    },
  });

  const data = await response.json();

  const newestTokens = data.sort((a, b) => b.createdPoolAt - a.createdPoolAt)
  const infos = newestTokens.slice(0, 30);


  for (const token of infos) {
    const tokenId = token.tokenAddress;
    const chainId = token.chainId.toUpperCase();
    const website = token.links?.find(s => s.label === 'Website')?.url;
    const telegram = token.links?.find(s => s.type === 'telegram')?.url;
    const twitter = token.links?.find(s => s.type === 'twitter')?.url;
    console.log(tokenId, chainId, website, telegram, twitter)
    const resName = await fetch(`https://api.dexscreener.com/tokens/v1/${chainId}/${tokenId}`);
    const dataName = await resName.json();
    const imageURL = dataName[0].info.imageUrl;
    const tokenName = dataName[0].baseToken.name;
    //Creating new elements to append

    const name  = document.createElement('p')
    name.id = 'name'
    name.textContent = `${tokenName}/${chainId}`;

    const img = document.createElement('img')
    img.id = 'her'
    img.src = imageURL;

    const nameBox = document.createElement('div')
    nameBox.className = 'name-sec'

    const twitterIMG = document.createElement('img');
    twitterIMG.src = 'twitter.png'
    twitterIMG.className = 'dd'

    const telegramIMG = document.createElement('img');
    telegramIMG.src = 'tg.png'
    telegramIMG.className = 'de'

    const websiteIMG = document.createElement('img');
    websiteIMG.src = 'globe.png'
    websiteIMG.className = 'dd'

    const twitterLink = document.createElement('a')
    twitterLink.href = twitter;
    twitterLink.target = '_blank'

    const telegramLink = document.createElement('a')
    telegramLink.href = telegram;
    telegramLink.target = '_blank'

    const WebsiteLink = document.createElement('a')
    WebsiteLink.href = website;
    WebsiteLink.target = '_blank'

    const socialBox = document.createElement('div')
    socialBox.className = 'socials'
    
    const box = document.createElement('div')
    box.className = 'box'


    //appending everything now
    twitterLink.appendChild(twitterIMG)
    telegramLink.appendChild(telegramIMG)
    WebsiteLink.appendChild(websiteIMG)

    socialBox.appendChild(twitterLink)
    socialBox.appendChild(telegramLink)
    socialBox.appendChild(WebsiteLink)

    nameBox.appendChild(img)
    nameBox.appendChild(name)

    box.appendChild(nameBox)
    box.appendChild(socialBox)

    contentBox.appendChild(box)
  }
}
fetchNewTokens()
refresh.addEventListener('click', ()=>{
  contentBox.textContent = ''
  fetchNewTokens()
})