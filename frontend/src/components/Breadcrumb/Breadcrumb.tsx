type BreadcrumbPropsType = {
  title: string;
  previous: {
    id: string;
    url: string;
    content: string;
  }[];
  current: string;
  background_image: string;
};

export default function Breadcrumb(props: BreadcrumbPropsType) {
  return (
    <section
      className="breadcrumb-section set-bg"
      style={{ backgroundImage: `url(${props.background_image})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="breadcrumb__text">
              <h2>{props.title}</h2>
              <div className="breadcrumb__option">
                {props.previous.map((item) => (
                  <a key={item.id} href={item.url}>
                    {item.content}
                  </a>
                ))}
                <span>{props.current}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
