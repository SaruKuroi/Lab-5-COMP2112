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
      email = JSON.parse(localStorage.getItem('emaildata'));
      
      const insert = email.map((name, index) => 
              `<div data-index=${index} class="${name.selected ? 'email-item-selected' : ''} email-item pure-g">
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
   const list = document.querySelector('#list')
   list.innerHTML = insert;

    const sidebar = Array.from(document.querySelectorAll('.email-item'));
    sidebar.map(emails => {
      emails.addEventListener('click', function() {
        email.map(select => {select.selected = false});
        email[this.dataset.index].selected = true;
        render(email);
      })
    })
      }) 
  } else {
     console.log("yes local storage");
     email = JSON.parse(localStorage.getItem('emaildata'));
    const insert = email.map((name, index) => 
              `<div data-index=${index} class="${name.selected ? 'email-item-selected' : ''} email-item pure-g">
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
   const list = document.querySelector('#list')
   list.innerHTML = insert;

    const sidebar = Array.from(document.querySelectorAll('.email-item'));
    sidebar.map(emails => {
      emails.addEventListener('click', function() {
        email.map(select => {select.selected = false});
        email[this.dataset.index].selected = true;
        render(email);
      })
    })
  }
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

}
render();


