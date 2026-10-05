async function loadData() {
  const divToFill = document.querySelector("div#projectsFill");
  const projectsData = await fetch("projects.json");

  if (projectsData.status !== 200) return;

  const projects = (await projectsData.json()).projects;
  divToFill.innerHTML = "";

  projects.forEach((project) => {
    console.log(project.name);

    const cardData = `
            <div class="col-lg-6 col-xxl-4 mb-5">
                <div class="card bg-light border-1 h-100">
                    ${project.url !== null
                        ? `
                            <a
                                href="${project.url}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="btn btn-sm rounded btn-light position-absolute top-0 end-0 m-2"
                            >
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        `
                        : ''
                    }
                    <div class="ratio-16x9 overflow-hidden">
                        <img class="card-img-top forced-16x9" src="images/${project.image}" alt="${project.name}'s image">
                    </div>
                    <div class="card-body px-2 px-lg-3">
                        <h2 class="fs-4 fw-bold">${project.name}</h2>
                        <p class="mb-0">${project.description}</p>

                        ${project.team !== null ? `
                                <h4 class="mt-2">Team members</h4>
                                <p>${project.team.join(', ')}</p>
                        ` : ``}
                    </div>

                        <div class="card-footer">
                        ${project.tags.map((tag) => {
                            console.log(tag)
                            return `<span class="badge rounded-pill text-bg-info">${tag}</span>`
                        }).join(' ')}
                        </div>
                </div>
            </div>
        `;

    divToFill.innerHTML += cardData;
  });
}

loadData();
