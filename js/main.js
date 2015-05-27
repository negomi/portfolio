var Images = (function() {
  var sections = ['bikestash', 'scrollaway', 'sassyInputs'];

  function handleImage(container) {
    var inView = container.getBoundingClientRect().bottom - window.innerHeight < 50;

    if (inView) {
      var image = container.getElementsByClassName('project-image')[0];

      if (!image) {
        throw new Error("Missing .project-image element");
      }

      image.setAttribute('style', 'display: block;');
    }
  }

  return {
    run: function() {
      sections.forEach(function(section) {
        var container = document.getElementById(section);

        if (!container) {
          throw new Error("No element with ID '" + section +"'");
        }

        window.addEventListener('scroll', handleImage.bind(null, container));
      });
    }
  };
})();

Images.run();
