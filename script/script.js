//Function to insert data into HTML from local storage after getting JSON data
function addEmail(email) {
  email = JSON.parse(localStorage.getItem('emaildata'));
  const insert = email.map((name, index) => 
              `<div data-index=${index} class="email-item ${name.selected == true ? 'email-item-selected' : ''} pure-g">
              <div class="pure-u">
                  <img width="64" height="64" alt="${name.first_name} avatar" class="email-avatar"          src="${name.avatar}">
              </div>

              <div class="pure-u-3-4">
                  <h5 class="email-name">${name.first_name} ${name.last_name}</h5>
                  <h4 class="email-subject">${name.subject}</h4>
                  <p class="email-desc">
                      ${name.body}
                  </p>
              </div>
          </div>
  `).join('');
   const list = document.querySelector('#list');
   list.innerHTML = insert;
  
   //Variables for inserting content
  const emailTitle = document.querySelector('.email-content-title');
  const subTitle = document.querySelector('.email-content-subtitle a');
  const emailDate = document.querySelector('.email-content-subtitle span');
  const emailBody = document.querySelector('.email-content-body');

  //AddEventListener for when user clicks on an email to highlight and display content
   const sidebar = Array.from(document.querySelectorAll('.email-item'));
   sidebar.map(emails => {
     emails.addEventListener('click', function() {
        email.map(select => select.selected = false);
        email[this.dataset.index].selected = true;
        emailTitle.textContent = email[this.dataset.index].subject;
        subTitle.textContent = `${email[this.dataset.index].first_name} ${email[this.dataset.index].last_name}`;
        emailDate.textContent = email[this.dataset.index].date;
        emailBody.textContent = email[this.dataset.index].body;
        localStorage.setItem('emaildata', JSON.stringify(email));
        render(email); 
     })
   })
}
//Fetching and setting data from api, checking whether information is stored into local storage or not
function render(email) {
  if (!localStorage.getItem("emaildata")) {
    console.log("no local storage");
    fetch('https://my.api.mockaroo.com/email.json?key=b5bb98d0')
      .then(function(api) {
        return api.json();
      })
      .then(function(data) {
        email = data;
      localStorage.setItem('emaildata', JSON.stringify(email));     
      addEmail();
  }) 
  } else {
    console.log("yes local storage");
    addEmail();
}

  //Creating form when wanting to compose a new email
const compose = document.querySelector('.primary-button');
const main = document.querySelector('#main');
  
  compose.addEventListener('click', (i) => {
    i.preventDefault();
    main.innerHTML = `
    <form class='new-email'>
      <div>
        <label for= 'fname'>First Name</label>
        <input type='text' name='fname' id='fname' required='required' />
      </div>
      <div>
        <label for= 'lname'>Last Name</label>
        <input type='text' name='lname' id='lname' required='required' />
      </div>
      <div>
      <label for= 'sub'>Subject</label>
      <input type='text' name='sub' id='sub' required='required' />
    </div>
      <div>
        <label for='etext'></label>
        <textarea name='etext' id='etext' rows='10'></textarea>
      </div>
      <button type='submit'>Submit</button>
    </form>
    `
    //Saving data to local storage and adding new email to top of the list
    const form= document.querySelector('form');
    form.addEventListener('submit', function(saving) {
    saving.preventDefault();
    const adding = {
      first_name: this.fname.value,
      last_name: this.lname.value,
      subject: this.sub.value,
      body: this.etext.value,
      avatar: 'https://avatars3.githubusercontent.com/u/33965140?v=4',
      date: Date.now()
    };
    
    email.unshift(adding);
    console.log(email);
    localStorage.setItem('emaildata', JSON.stringify(email));     

    location.reload();
    })
  })

  const selected = document.querySelector('.email-item-selected');
  const selectIndex = selected.getAttribute('data-index');
  //Delete button addEventListener
  const deleteBtn = document.querySelector('.delete');        
  
  deleteBtn.addEventListener('click', function() {
    //Grab the data-index of the selected email, connect it to the email array id
    //Take it out of the email array and add it to another
    //set new array to local storage so it can be viewed and saved independently
    
  })
  //Inbox button addEventListener
  const inboxBtn = document.querySelector('.inbox');
  inboxBtn.addEventListener('click', function() {
    //when clicking on the inbox button, pull up email array information, which will show only the emails that have not been deleted
  })

  //Trash button addEventListener
  const trashBtn = document.querySelector ('.trash');
  trashBtn.addEventListener('click', function() {
    //when clicking on the trash button, pull up new array information, which will show only the emails that have been deleted
  })
}
render();


