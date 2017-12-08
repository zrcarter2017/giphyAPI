			//array of comedians
			topics = ['will ferrell', 'jack black', 'adam sandler', 'jim carey'];



			//create a button for all items in topic array
			for (var i = 0; i < topics.length; i++) {
				$('#buttons').append("<button class='btn btn-success newButton'" + "data-person=" + '"' + topics[i] + '"' + ">" + topics[i] + "</button>");
				console.log(topics[i]);
			}


			// get input box
			var comedian = document.getElementById('comedian');

			//push user input to topics array and add a button

			$('.newComedian').on("click", function() {
				console.log(comedian.value);
				topics.push(comedian.value.toLowerCase());
				console.log(topics);
				$('#buttons').prepend("<button class='btn btn-success newButton'"  + "data-person=" + "'" + comedian.value.toLowerCase() +"'" + ">" + comedian.value + "</button>");
				console.log(comedian.value.toLowerCase());
			});



			//add event listener for #buttons div, call ajax and display gifs when button is clicked

		    $("#buttons").on("click", ".newButton", function() {
		    	event.preventDefault();
		      var person = $(this).attr("data-person");
		      console.log(person);
		      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
		        person + "&api_key=WrZVFEkjylZmt1AO1PyAmKS2uPtf4eLK&limit=10";

		      $.ajax({
		          url: queryURL,
		          method: "GET"
		        })
		        .done(function(response) {
		          console.log(response);
		          var results = response.data;

		          for (var i = 0; i < results.length; i++) {
		            var gifDiv = $("<div>");

		            var rating = results[i].rating;

		            var p = $("<p>").text("Rating: " + rating);

		            var comedianImage = $("<img data-animate=" + results[i].images.fixed_height.url 
		            	+ " data-still=" + results[i].images.fixed_height_still.url 
		            	+ " data-state='still' class='item'>");
		            comedianImage.attr("src", results[i].images.fixed_height_still.url);
		            comedianImage.on("click", clickEventHandler);
		            


		            gifDiv.prepend(p);
		            gifDiv.prepend(comedianImage);

		            $("#giphy").prepend(gifDiv);
		            
		          }
		        });
		    });

		    //pause and play gifs

		     	var clickEventHandler = function() {

		       
			        var state = $(this).attr("data-state");
			        
			        if (state == "still") {

			          $(this).attr("data-state", "animate");
			          $(this).attr("src", $(this).attr('data-animate'));
			          console.log("this was still");
			        }

			        else
			      
			        {

			          var d = $(this).attr('data-animate');
			          console.log(d);
			          $(this).attr("data-state", "still");
			          $(this).attr("src", $(this).attr('data-still'));
			          console.log("this was animated");
			        }

			       


			    };