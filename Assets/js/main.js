			document.addEventListener('DOMContentLoaded', function() {
				const navLinks = document.querySelectorAll('.nav-link');
				const navIndicator = document.getElementById('navIndicator');
				
				function setActiveLink(link) {
					navLinks.forEach(item => item.classList.remove('active'));
					
					link.classList.add('active');
					const index = link.getAttribute('data-index');
					const width = 100 / navLinks.length;
					navIndicator.style.width = `${width}%`;
					navIndicator.style.left = `${index * width}%`;
				}
				
				function initIndicator() {
					const width = 100 / navLinks.length;
					navIndicator.style.width = `${width}%`;
					navIndicator.style.left = `0%`;
					
					const activeLink = document.querySelector('.nav-link.active');
					if (activeLink) {
						const index = activeLink.getAttribute('data-index');
						navIndicator.style.left = `${index * width}%`;
					}
				}
				
				navLinks.forEach(link => {
					link.addEventListener('click', function(e) {
						e.preventDefault();
						setActiveLink(this);
					});
				});
				
				initIndicator();
				
				window.addEventListener('resize', initIndicator);
			});