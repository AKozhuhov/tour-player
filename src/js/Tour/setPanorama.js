/* globals Tour */

/**
 * Переключает тур на указанную панораму
 *
 * @param {Number} id идентификатор панорамы
 */
Tour.setPanorama = function(id) {

    var change = function(id) {
        this.setTexture(id);
        this.setMarkers(id);
        this.setMesh(id);
        var panorama = this.getPanorama(id);
        this.view.rotation.auto = panorama.autorotation !== false &&
            (panorama.autorotation || this.data.autorotation);
    };

    if (this.options.rendererType != 'css' && this.options.transition) {

        var imageUrl = this.mesh.material[0].map.image ?
            this.renderer.domElement.toDataURL('image/jpeg') : this.data.backgroundImage;

        this.backgroundImage.set(
            imageUrl,
            this.data.backgroundColor,
            function() {
                Tour.mesh.rotation.set(0, Math.PI / 2 - ((this.getPanorama(id).heading || 0) / 180 * Math.PI), 0);
                this.data.backgroundImage = false;
                document.body.classList.add('transition');
                change.call(this, id);
            }.bind(this)
        );
    } else {
        change.call(this, id);
    }
};
