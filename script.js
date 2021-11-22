let roots =document.querySelector("#root")
let container=document.createElement("div")
container.setAttribute('class','container')
let heading=document.createElement('h1')
heading.setAttribute('id','heading')
heading.textContent='Recipes'
document.body.prepend(heading)
let divSelect=document.getElementsByClassName('selects')
let select=document.querySelector('#select')
let options=document.getElementsByTagName('option')
let input=document.querySelector('.text')

function run(){
document.querySelector('.text').value=document.querySelector('#select').value
roots.innerHTML=" "
container.innerHTML=' '
fetch(`https://forkify-api.herokuapp.com/api/search?q=${ document.querySelector('#select').value}`)
.then((res)=>res.json())
.then(data =>{
  let heading1=document.createElement('h2')
  heading1.setAttribute('id','heading1')
  heading1.textContent=document.querySelector('.text').value
roots.appendChild(heading1)
    let recipes =data.recipes
    console.log(recipes)
    recipes.forEach(recipes => {
        console.log(recipes,"11111")
        let Card=document.createElement('div')
      Card.setAttribute('class','Card')

       let img=document.createElement('img') 
       img.setAttribute("id",'image')
       img.src=recipes.image_url
       Card.appendChild(img)

       let h1=document.createElement('h2')
       h1.textContent=recipes.title
       Card.appendChild(h1)
      
       let para=document.createElement('p')
       para.textContent=recipes.publisher
       Card.appendChild(para)
       let hoverIcon=document.createElement('div')
       hoverIcon.setAttribute('class','sourses')
       let sourse=document.createElement('a')
       sourse.href=recipes.source_url
       let iconImg=document.createElement('img')
       iconImg.className='link'
       iconImg.src = 'assets/link_icon.png';
       sourse.appendChild(iconImg)
       hoverIcon.appendChild(sourse)
       Card.appendChild(hoverIcon)
       let details=document.createElement('a')
       details.className='detailsBtn'
       details.textContent='More Details'
    
     function addDetails(){
     fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipes.recipe_id}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
      let resp=data.recipe
      let divList=document.createElement('div')
      divList.className='unorderList';
      let unorderLists=document.createElement('ul');
      let stepIngredients=resp.ingredients
      stepIngredients.forEach(ele=>{
        let list =document.createElement('li');
        list.className='list'
            list.textContent=ele
            unorderLists.appendChild(list)
       })
       
     details.textContent='Less Details'
Card.appendChild(details)
    divList.appendChild(unorderLists)
    Card.appendChild(divList)
    
        })
     }


       Card.appendChild(details)
      details.addEventListener('click',addDetails,{once:true} )
       container.appendChild(Card)
       roots.appendChild(container)
       
    });
})

.catch((err)=>console.log(err))
}
select.onchange = run;