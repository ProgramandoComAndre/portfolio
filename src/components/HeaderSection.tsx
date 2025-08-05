
function HeaderSection() {
  return (
    <header className="main-header">
      <div className="title-container">
        <p>
          Olá, o meu nome é <span className="bold">André Teixeira</span>
        </p>
        <p className="subtitle">
          Junior Software Developer | .NET Core | Node.js | Estudante de Engenharia Informática
        </p>

        <div className="cv-button-container">
          <a
            href="/cv-andre-teixeira.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="cv-button"
          >
            Ver Currículo (PDF)
          </a>
        </div>
      </div>

      <div className="image-container">
        <img
          id="profile-image"
          src="https://media.licdn.com/dms/image/v2/D4D03AQHcC-YKJq45kA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1669368839010?e=1757548800&v=beta&t=avOSqf4D1yyPBmZkNgPEt6Q7P5F2fFG-mVZ_Sdi_0Pk"
          alt="Foto de perfil"
        />
      </div>
    </header>
  );
}

export default HeaderSection;
