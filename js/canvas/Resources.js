function Resources(){
	
	var loadedResources = new Object();
		
	this.load = function(imageResourcesURLs, percentageListener){
		var resourcesLoaded = 0;
		var resourceCount = imageResourcesURLs.length;
		 
		for(var i in imageResourcesURLs){
			(function(){
				var image = new Image();
				var imageUrl = imageResourcesURLs[i].url;
				var imageName = imageResourcesURLs[i].name;
				
				image.onload = function(){
					var m_canvas = document.createElement('canvas');
					m_canvas.width = ballWidth;
					m_canvas.height = ballHeight;
					var m_context = m_canvas.getContext('2d');
					m_context.drawImage(image, 0, 0);
					loadedResources[imageName] = m_canvas;
										
					resourcesLoaded++;
					var newPercetage = (resourcesLoaded/resourceCount)*100;
					percentageListener.updateLoadedPercentage(newPercetage);
					if(resourcesLoaded == resourceCount)
						percentageListener.loadingComplete();
				};
				image.src = imageUrl;
			})();
		}
	};
	
	this.get = function(resourceName){
		if(loadedResources[resourceName] == null)
			throw "No such resource "+resourceName;
		return loadedResources[resourceName];
	};
}
