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
    removeActive()
    const url=`https://openapi.programming-hero.com/api/level/${id}`
    console.log(url)
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
        const clickedBtn=document.getElementById(`lesson-btn-${id}`)

clickedBtn.classList.add("active")
        displayLevelWord(data.data)
    })
}


// {id: 5, level: 1, word: 'Eager', meaning: 'আগ্রহী', pronunciation: 'ইগার'}




const displayLevelWord=(words)=>{const wordContainer=document.getElementById("word-container")
    wordContainer.innerHTML=``

    if(words.length===0){
        wordContainer.innerHTML=`   <div class="text-center col-span-full"><img class="mx-auto" src="./assets/alert-error.png"><p class="text-xl text-gray-500 rounded-xl py-10 space-y-6">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
    <h2 class="font-bold font-bangla text-4xl">নেক্সট Lesson এ যান</h2></div>`
        return
    }
    words.forEach(word=>{
        console.log(word)
        const card=document.createElement("div")
        card.innerHTML=`<div class="bg-white rounded-xl shadow-sm text-center py-10 px-5"><h2 class="font-bold text-xl">${word.word ? word.word : "word pawa jaini"}</h2><p class="font-semibold">Meaning /Pronounciation</p><div></div><p class="font-bangla">"${word.meaning ? word.meaning : "meaning pawa jai ni"} / ${word.pronunciation ? word.pronunciation : "pronouncition pawa jai ni"}"</p> <div class="flex justify-between items-center"><button onclick="my_modal_5.showModal()" class="btn bg-[#37495710] hover:bg-[#37495780]"><i class="fa-solid fa-circle-info"></i></button><button class="btn bg-[#37495710] hover:bg-[#37495780]"><i class="fa-solid fa-volume-high"></i></button></div></div>`
        wordContainer.append(card)
    })
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