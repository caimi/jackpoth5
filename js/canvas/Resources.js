function Resources(){
	
	var loadedResources = new Object();
		
	this.load = function(resources, percentageListener){
		var resourcesLoaded = 0;
		var resourceCount = resources.length;
		 
		var imageResourcesURLs = new Array();
		var audioResourcesURLs = new Array();
		for(var i in resources){
			if(resources[i].type == "image")
				imageResourcesURLs.push(resources[i]);
			if(resources[i].type == "audio")
				audioResourcesURLs.push(resources[i]);
		}
		
		for(var i in imageResourcesURLs){
			(function(){
				var image = new Image();
				var imageUrl = imageResourcesURLs[i].url;
				var imageName = imageResourcesURLs[i].name;
				
				image.onload = function(){
					var m_canvas = document.createElement('canvas');
					m_canvas.width = this.width;
					m_canvas.height = this.height;
					var m_context = m_canvas.getContext('2d');
					m_context.drawImage(image, 0, 0);
					loadedResources[imageName] = m_canvas;
					//TODO: one function					
					resourcesLoaded++;
					var newPercetage = (resourcesLoaded/resourceCount)*100;
					percentageListener.updateLoadedPercentage(newPercetage);
					if(resourcesLoaded == resourceCount){
						percentageListener.loadingComplete();
					}
					//--
				};
				image.src = imageUrl;
			})();
		}
		
		for(var i in audioResourcesURLs){
			(function(){
				var audioUrl = audioResourcesURLs[i].url;
				var audioName = audioResourcesURLs[i].name;
				var audio = new Audio(audioUrl);
				if(loadedResources[audioName]) return;
				loadedResources[audioName] = audio;
				loadedResources[audioName].type = "audio";
				//screw it, this does not preload audio
				//TODO: one function
				resourcesLoaded++;
				var newPercetage = (resourcesLoaded/resourceCount)*100;
				percentageListener.updateLoadedPercentage(newPercetage);
				if(resourcesLoaded == resourceCount){
					percentageListener.loadingComplete();	
				}
				//-- 
			})();
		}
			
	};
	
	this.get = function(resourceName){
		if(loadedResources[resourceName] == null)
			throw "No such resource "+resourceName;
		if(loadedResources[resourceName].type == "audio"){
			loadedResources[resourceName].load();
		}
		return loadedResources[resourceName];
	};
}

var resources = new Resources();