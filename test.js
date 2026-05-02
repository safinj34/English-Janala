const syn=["hello","hi"]
const createEelemts=(arr)=>{const htmlElements=arr.map(el=>`<span class="btn">${el}</span>`)
console.log(htmlElements.join(" "))}
createEelemts(syn)
