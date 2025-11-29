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
  try {
    const data = await response.json();
    const newestTokens = data.sort((a, b) => b.createdPoolAt - a.createdPoolAt)
    const infos = newestTokens.slice(0, 30);


    for (const token of infos) {

      const tokenId = token.tokenAddress;
      const description = token.description?.slice(0, 33);
      const chainId = token.chainId.toLowerCase();
      const realChain = chainId.slice(0, 3)
      const website = token.links?.find(s => s.label === 'Website')?.url;
      const telegram = token.links?.find(s => s.type === 'telegram')?.url;
      const twitter = token.links?.find(s => s.type === 'twitter')?.url;
      const resName = await fetch(`https://api.dexscreener.com/tokens/v1/${chainId}/${tokenId}`);
      const dataName = await resName.json();
      const imageURL = dataName[0].info.imageUrl;
      const tokenName = dataName[0].baseToken.name.slice(0, 15);


      //Creating elements to append
      const box = document.createElement('div')
      box.classList.add('box')

      const imageSec = document.createElement('div')
      imageSec.className = 'image-sec'

      const img = document.createElement('img')
      img.id = 'wee'
      img.src = imageURL;

      const blabsec = document.createElement('div')
      blabsec.className = 'blab-sec'

      const name = document.createElement('div')
      name.className = 'name'
      name.textContent = `${tokenName}/${realChain}`

      const des = document.createElement('div')
      des.className = 'description'
      des.textContent = description + '...'

      const act = document.createElement('div')
      act.className = 'action'

      const twitterBox = document.createElement('div')
      twitterBox.className = 'chain'
      twitterBox.innerHTML = '<i class="fa-brands fa-x-twitter"></i>' + 'Twitter'

      const telegramBox = document.createElement('div')
      telegramBox.className = 'chain'
      telegramBox.innerHTML = '<i class="fa-brands fa-telegram"></i>' + 'Telegram'

      const websiteBox = document.createElement('div')
      websiteBox.className = 'chain'
      websiteBox.innerHTML = '<i class="fa-solid fa-globe"></i>' + 'Website'

      const twitterLink = document.createElement('a')
      twitterLink.target = '_blank'
      twitterLink.href = twitter
      twitterLink.id = 'hh'

      const telegramLink = document.createElement('a')
      telegramLink.target = '_blank'
      telegramLink.href = telegram
      telegramLink.id = 'hh'

      const websiteLink = document.createElement('a')
      websiteLink.target = '_blank'
      websiteLink.href = website
      websiteLink.id = 'hh'
      //testing append
      imageSec.appendChild(img);
      box.appendChild(imageSec)
      blabsec.appendChild(name)
      blabsec.appendChild(des)
      twitterLink.appendChild(twitterBox)
      telegramLink.appendChild(telegramBox)
      websiteLink.appendChild(websiteBox)
      act.appendChild(twitterLink)
      act.appendChild(telegramLink)
      act.appendChild(websiteLink)
      blabsec.appendChild(act)
      box.appendChild(blabsec)
      contentBox.appendChild(box)


    }
  }
  catch (err) {
    console.error(err)
  }
}



fetchNewTokens()
