export const useScrollToProjects = () => {
  const scrollToProjects = () => {
    const isMobile = window.innerWidth <= 1200;
    
    if (isMobile) {
      // On mobile, scroll to the first project (projects-wrapper)
      const projectsWrapper = document.querySelector('.projects-wrapper');
      if (projectsWrapper) {
        const yOffset = -20;
        const y = projectsWrapper.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    } else {
      // On desktop, scroll to the section start
      const element = document.getElementById('projects-section');
      if (element) {
        const yOffset = -20;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    }
  };

  return { scrollToProjects };
};