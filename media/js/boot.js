(function (doc) {

    var currentScript = doc.getElementsByTagName('script');
    currentScript = currentScript[currentScript.length - 1];
    var scriptPath = currentScript.getAttribute('src').split('/');
    scriptPath = scriptPath.slice(0, scriptPath.length - 1).join('/');

    function addScript(name) {
        var tag = doc.createElement('script');
        doc.body.appendChild(tag);
        tag.src = scriptPath + '/' + name + (name.substr(-2) === '.js' ? '' : '.js');
    }

    window.boot = function boot (scripts, after) {
        scripts.forEach(function (s) {
            console.log('rehydrating ' + s);
            addScript(s);
        });
        window.addEventListener('load', after);
    };

    addScript('config');

})(document);
