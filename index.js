if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('sw.js')
           .then(function() { console.log('Service Worker Registered'); });
}
let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    addBtn.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted');
        } else {
          console.log('User dismissed');
        }
        deferredPrompt = null;
      });
  });
});

function uploadIMG(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#img')
                    .attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }