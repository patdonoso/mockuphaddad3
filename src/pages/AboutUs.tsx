import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const teamMembers = {
  leadership: [
    {
      name: "Rolando Haddad A.",
      role: "Fundador",
      subtitle: "Q.E.P.D. (5.07.1919 - 24.07.2014)",
      isFounder: true,
    },
    {
      name: "Alberto Haddad V.",
      role: "Gerente General",
    },
    {
      name: "Yuny Haddad T.",
      role: "Gerente Sistema Gestión Integrado",
    },
  ],
  salesLeaders: [
    {
      name: "Flor Bravo",
      role: "Jefa de Ventas",
      email: "fbravo@haddad.cl",
    },
    {
      name: "Caroline Echenique",
      role: "Sub Jefa de Ventas",
      email: "cechenique@haddad.cl",
    },
    {
      name: "Patricia Valdés",
      role: "Secretaria de Recepción",
    },
  ],
  salesTeam: [
    { name: "Angela Vargas", role: "Facturación", email: "facturacion@haddad.cl" },
    { name: "Sandra Jaramillo", role: "Cuentas Corrientes", email: "sjaramillo@haddad.cl" },
    { name: "Camila Campos", role: "Cotizaciones", email: "ventas@haddad.cl" },
    { name: "Roxana Sánchez", email: "rsanchez@haddad.cl" },
    { name: "Yasmín Godoy", email: "yasmin@haddad.cl" },
    { name: "Paula Pérez", email: "paulaperez@haddad.cl" },
    { name: "Carola Herrera", email: "cherrera@haddad.cl" },
    { name: "Dennys Amador", email: "damador@haddad.cl" },
    { name: "Macarena Muñoz", email: "mmunoz@haddad.cl" },
    { name: "Luz Salazar", email: "lsalazar@haddad.cl" },
    { name: "Lelia Suárez", email: "lsuarez@haddad.cl" },
    { name: "Cynthia Toledo", email: "ctoledo@haddad.cl" },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const TeamCard = ({ member, isLarge = false }: { member: any; isLarge?: boolean }) => (
  <motion.div
    variants={itemVariants}
    className={`bg-card rounded-xl shadow-lg p-6 text-center border border-border hover:shadow-xl transition-shadow ${
      isLarge ? "col-span-1" : ""
    } ${member.isFounder ? "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30" : ""}`}
  >
    <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-primary-foreground text-2xl font-bold ${member.isFounder ? "ring-4 ring-primary/30" : ""}`}>
      {member.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("")}
    </div>
    <h3 className="font-semibold text-foreground text-lg">{member.name}</h3>
    {member.role && <p className="text-primary font-medium text-sm mt-1">{member.role}</p>}
    {member.subtitle && <p className="text-muted-foreground text-xs mt-1">{member.subtitle}</p>}
    {member.email && (
      <a href={`mailto:${member.email}`} className="text-primary hover:underline text-sm mt-2 block">
        {member.email}
      </a>
    )}
  </motion.div>
);

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Conózcanos
            </h1>
            <p className="text-lg text-muted-foreground">
              Más de 60 años de experiencia en la industria de plásticos, 
              comprometidos con la calidad y la innovación.
            </p>
          </motion.div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12 border border-border">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                Nuestra Historia
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-4">
                  En 1955, nuestro visionario fundador, <strong className="text-foreground">Rolando Haddad Abdallah</strong>, 
                  lanzó al mercado las famosas <strong className="text-primary">"Peinetas Pantera"</strong>, 
                  que han estado ininterrumpidamente en el mercado por más de 60 años, 
                  manteniendo su calidad sin variaciones a lo largo del tiempo.
                </p>
                <p className="mb-4">
                  Hoy en día, seguimos innovando con productos como las <strong className="text-foreground">"Peinetas Pantera Biocid"</strong>, 
                  que contienen nanopartículas de cobre que eliminan el 99,9% de los gérmenes.
                </p>
                <p>
                  Contamos con certificaciones <strong className="text-foreground">ISO 9001:2015</strong> e <strong className="text-foreground">ISO 14001:2015</strong>, 
                  demostrando nuestro compromiso con la calidad y el medio ambiente.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-foreground mb-12 text-center"
          >
            Liderazgo
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {teamMembers.leadership.map((member) => (
              <TeamCard key={member.name} member={member} isLarge />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sales Team Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center"
          >
            Equipo de Ventas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
          >
            Nuestro dedicado equipo está listo para atenderle y ayudarle a encontrar los productos que necesita.
          </motion.p>
          
          {/* Sales Leaders */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8"
          >
            {teamMembers.salesLeaders.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </motion.div>

          {/* Sales Team */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
          >
            {teamMembers.salesTeam.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Visítenos</h2>
            <div className="space-y-4">
              <p className="text-lg">
                <strong>Sala de Ventas:</strong> José Ananías 444, Macul
              </p>
              <p>
                <strong>Horario:</strong> Lunes a Jueves 08:00 a 17:00 | Viernes 08:00 a 13:30 hrs
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:ventas@haddad.cl" className="underline hover:opacity-80">
                  ventas@haddad.cl
                </a>
              </p>
              <div className="mt-8 p-4 bg-white/10 rounded-lg inline-block">
                <p className="text-sm">
                  <strong>Datos para Transferencia:</strong><br />
                  Banco BCI - Cuenta Corriente 83023348<br />
                  Plásticos Haddad S.A. | RUT: 86.778.100-5
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default AboutUs;
