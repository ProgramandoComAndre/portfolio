import { useEffect, useState } from "react";

type Repo = {
  name: string;
  description: string;
  html_url: string;
  language: string;
};

function StarredProjects() {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    fetch("https://api.github.com/users/ProgramandoComAndre/starred?per_page=100")
      .then((res) => res.json())
      .then((data) => {
        const starred = data.map((repo: any) => ({
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          language: repo.language,
        }));
        setRepos(starred);
      })
      .catch((err) => console.error("Erro ao buscar repositórios:", err));
  }, []);

  return (
    <section className="starred-projects">
      <h2>⭐ Projetos Pessoais</h2>
      <div className="repo-list">
        {repos.map((repo) => (
          <div key={repo.html_url} className="repo-card">
            <h3>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h3>
            <p>{repo.description}</p>
            <small>{repo.language}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StarredProjects;
