const url = "/todos/create"
const endPoint = "https://localhost:4443"
let users = [];

    if( document.location.href.toString().includes("home")) {
      console.log("dans home",);
      // faire requete pour recuperer les users
      getUsers();
      //fillSelectUsers();
    }
    const form = document.getElementById('taskCreation');
   
     form.addEventListener('submit', e => {
      e.preventDefault(); 
      console.log(`valeur du form `,form.ATTRIBUTE_NODE,form.action);
      const input = document.getElementById('taskTexte');
      const select = document.getElementById('Categorie');
      const affiliateUser = document.getElementById('user');
    
      fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          txt: input.value,
          cat: select.value,
          user: affiliateUser.value
        })
      }).then(() => location.href = '/todos');
    });
  

    
    function getUsers() {
      console.log('get users',endPoint+"/users");
      fetch(endPoint+"/user", 
      {method: "GET"})
  .then((res) => {
      console.log('1e then');
      console.log(`res ligne 38`,res);
      return res.json();
  })
  .then(data => {
      console.log('2e then')
      users = data;
      fillSelectUsers(users);
      addListenerSelectUsers();
  });
  }
  
  function fillSelectUsers(users) {
      console.log("users :", users);
      const selectUsers = document.getElementById("list-user");
      const affiliateUser = document.getElementById('user');
      let htmlContent = "<option value='empty' selected>Choisir un utilisateur</option>";
      users.forEach(u => {
          htmlContent += `<option value=" ${u.id}" > ${u.name} </option>`;
      });
      selectUsers.innerHTML = htmlContent;
      affiliateUser.innerHTML = htmlContent;
  }