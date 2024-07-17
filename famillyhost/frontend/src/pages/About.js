import React from 'react';
import './About.css'; // Import your custom CSS file for styling

const About = () => {
  return (
    <div className="about-page">
      <header className="header-section">
        <h1 className="header-title">منصتنا الإلكترونية للصحافة</h1>
        <p className="header-subtitle">استكشاف الثقافة المغربية مع السكان المحليين</p>
      </header>

      <main className="main-section">
        {/* Service Description Section */}
        <section className="service-section">
          <h2 className="section-title">خدماتنا تشمل:</h2>
          <div className="service-cards">
            {/* Card 1 */}
            <div className="service-card">
              <h3 className="card-title">الأخبار الرياضية</h3>
              <p className="card-description">
                تغطية شاملة لآخر أخبار الرياضة، من مباريات ونتائج إلى تقارير عن الفرق واللاعبين.
              </p>
            </div>
            {/* Card 2 */}
            <div className="service-card">
              <h3 className="card-title">الأخبار العامة</h3>
              <p className="card-description">
                تغطية شاملة للأحداث العالمية والمحلية، مع تقارير دقيقة عن الأحداث السياسية والاقتصادية.
              </p>
            </div>
            {/* Card 3 */}
            <div className="service-card">
              <h3 className="card-title">معلومات الطقس</h3>
              <p className="card-description">
                توقعات دقيقة للطقس، بما في ذلك درجات الحرارة والأحوال الجوية المتوقعة.
              </p>
            </div>
          </div>
        </section>

        {/* Collaboration Section */}
        <section className="collaboration-section">
          <h2 className="section-title">تعاون معنا</h2>
          <p className="section-description">
            يمكنك الاستفادة من خدماتنا والمشاركة معنا في تغطية الأخبار، كما يمكنك الإعلان عن خدماتك عبر منصتنا.
          </p>
        </section>

        {/* Contact Us Section */}
        <section className="contact-section">
          <h2 className="section-title">اتصل بنا</h2>
          <p className="section-description">
            لمزيد من المعلومات أو للتواصل معنا، يرجى زيارة موقعنا الإلكتروني أو التواصل معنا عبر البريد الإلكتروني.
          </p>
          <p className="section-description">
            تجربة المغرب كما لم تعرفها من قبل، مع منصتنا الإلكترونية للصحافة. انتظركم في زيارتنا!
          </p>
        </section>
      </main>

      <footer className="footer-section">
        <p>&copy; 2024 منصتنا الإلكترونية للصحافة. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
};

export default About;
