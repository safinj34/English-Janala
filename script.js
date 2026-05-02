function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}


const createEelemts=(arr)=>{const htmlElements=arr.map(el=>`<span class="btn">${el}</span>`)
return (htmlElements.join(" "))}


const managespinner=(status)=>{
    if(status===true){
        document.getElementById("spinner").classList.remove("hidden")
        document.getElementById("word-container").classList.add("hidden")
    }
    else{        document.getElementById("word-container").classList.remove("hidden")
        document.getElementById("spinner").classList.add("hidden")}
}

const loadLessons=()=>{
    const url="https://openapi.programming-hero.com/api/levels/all"
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>displayLessons(data.data))
}

const removeActive=()=>{
    const lessonButtons=document.querySelectorAll(".lesson-btn")
    
    lessonButtons.forEach(btn=>btn.classList.remove("active"))
}

const loadLevelWord=(id)=>{
    managespinner(true)
    removeActive()
    const url=`https://openapi.programming-hero.com/api/level/${id}`
  
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
        const clickedBtn=document.getElementById(`lesson-btn-${id}`)

clickedBtn.classList.add("active")
        displayLevelWord(data.data)
    })
}


const loadWordDetail=async(id)=>{
    const url=`https://openapi.programming-hero.com/api/word/${id}`

    const res=await fetch(url)
    const details=await res.json()
    displayWordDetails(details.data)

}


const displayWordDetails=(word)=>{const detailsBox=document.getElementById("detailsContainer")
    detailsBox.innerHTML=`<div class="space-y-5"><h2 class="text-2xl font-bold">${word.word}(<i class="fa-solid fa-microphone-lines"></i>):${word.pronunciation}</h2>
<h3 class="font-bold">Meaning</h3><p class="font-bangla font-semibold">${word.meaning}</p><h3 class="font-bold">Examples</h3><p class="font-bangla">${word.sentence}</p><div><h2 class="font-bold">Synonym</h2><div class="flex mt-5">${createEelemts(word.synonyms)}</div></div></div>`
    document.getElementById("my_modal_5").showModal()
}

// {id: 5, level: 1, word: 'Eager', meaning: 'আগ্রহী', pronunciation: 'ইগার'}




const displayLevelWord=(words)=>{const wordContainer=document.getElementById("word-container")
    wordContainer.innerHTML=``

    if(words.length===0){
        wordContainer.innerHTML=`   <div class="text-center col-span-full"><img class="mx-auto" src="./assets/alert-error.png"><p class="text-xl text-gray-500 rounded-xl py-10 space-y-6">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
    <h2 class="font-bold font-bangla text-4xl">নেক্সট Lesson এ যান</h2></div>`
    managespinner(false)
        return
    }
    words.forEach(word=>{
        
        const card=document.createElement("div")
        card.innerHTML=`<div class="bg-white rounded-xl shadow-sm text-center py-10 px-5"><h2 class="font-bold text-xl">${word.word ? word.word : "word pawa jaini"}</h2><p class="font-semibold">Meaning /Pronounciation</p><div></div><p class="font-bangla">"${word.meaning ? word.meaning : "meaning pawa jai ni"} / ${word.pronunciation ? word.pronunciation : "pronouncition pawa jai ni"}"</p> <div class="flex justify-between items-center"><button onclick="loadWordDetail(${word.id})" class="btn bg-[#37495710] hover:bg-[#37495780]"><i class="fa-solid fa-circle-info"></i></button><button onclick="pronounceWord('${word.word}')" class="btn bg-[#37495710] hover:bg-[#37495780]"><i class="fa-solid fa-volume-high"></i></button></div></div>`
        wordContainer.append(card)
    })
    managespinner(false)
}

const displayLessons=(lessons)=>{
    const levelContainer=document.getElementById("level-container")
    
    levelContainer.innerHTML=""
    for(let lesson of lessons){
        const btnDiv=document.createElement("div")
        btnDiv.innerHTML=`<button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" href="" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book"></i>Lesson-${lesson.level_no}</button>`
        levelContainer.append(btnDiv)
    }
}





loadLessons()

document.getElementById("btn-search").addEventListener("click",()=>{
    removeActive()
    const input=document.getElementById("input-search")
    const searchValue=input.value.trim().toLowerCase()
    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res=>res.json())
    .then(data=>{const allWords=data.data
        console.log(data)
        const filterWords=allWords.filter(word=>word.word.toLowerCase().includes(searchValue))
        displayLevelWord(filterWords)
    })
    
})