<template>
  <div class="panaderia-container">
    <div class="banner">
      
      <h1 class="titulo">Contáctanos</h1>
      <p class="subtitulo">
        Estamos aquí para atenderte. Comunícate con nosotros para cualquier
        consulta sobre nuestros productos, talleres de panadería o información
        general.
      </p>
    </div>

    <div class="contenido">
      <div class="info-contacto">
        <h2 class="seccion-titulo">Información de Contacto</h2>

        <div class="item-contacto">
          <div class="icono">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <div class="detalles">
            <h3>Dirección</h3>
            <p>Calle Principal 123,</p>
            <p>Barrio El Centro, Ciudad Panadero</p>
          </div>
        </div>

        <div class="item-contacto">
          <div class="icono">
            <i class="fas fa-phone"></i>
          </div>
          <div class="detalles">
            <h3>Teléfono</h3>
            <p>+503 2222-1111</p>
            <p>+503 7777-8888 (WhatsApp)</p>
          </div>
        </div>

        <div class="item-contacto">
          <div class="icono">
            <i class="fas fa-envelope"></i>
          </div>
          <div class="detalles">
            <h3>Correo Electrónico</h3>
            <p>info@eltrigodorado.com</p>
          </div>
        </div>

        <div class="item-contacto">
          <div class="icono">
            <i class="fas fa-clock"></i>
          </div>
          <div class="detalles">
            <h3>Horario de Atención</h3>
            <p>Lunes - Viernes: 6:00 - 20:00</p>
            <p>Sábado: 7:00 - 19:00</p>
            <p>Domingo: 8:00 - 14:00</p>
          </div>
        </div>
      </div>

      <div class="formulario-contacto">
        <h2 class="seccion-titulo">Envíanos un Mensaje</h2>

        <form @submit.prevent="enviarMensaje">
          <div class="fila-formulario">
            <div class="campo-formulario">
              <label for="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                v-model="formulario.nombre"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div class="campo-formulario">
              <label for="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                v-model="formulario.email"
                placeholder="tucorreo@ejemplo.com"
                required
              />
            </div>
          </div>

          <div class="campo-formulario">
            <label for="asunto">Asunto</label>
            <input
              type="text"
              id="asunto"
              v-model="formulario.asunto"
              placeholder="Asunto de tu mensaje"
              required
            />
          </div>

          <div class="campo-formulario">
            <label for="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              v-model="formulario.mensaje"
              placeholder="Escribe tu mensaje aquí..."
              rows="6"
              required
            ></textarea>
          </div>

          <button type="submit" class="boton-enviar">Enviar Mensaje</button>
        </form>
      </div>
    </div>

    <div class="ubicacion-seccion">
      <h2 class="seccion-titulo-accent">Nuestra Ubicación</h2>
      
      <div class="ubicacion-contenido">
        <div class="mapa-background">
          <div class="mapa-overlay">
            <div class="mapa-icono">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <h3 class="mapa-titulo">Panadería El Trigo Dorado</h3>
            <p class="mapa-direccion">
              Calle Principal 123,<br>
              Barrio El Centro, Ciudad Panadero
            </p>
            <a href="https://www.google.com/maps?q=Calle+Principal+123,+Barrio+El+Centro,+Ciudad+Panadero" target="_blank" class="boton-mapa">Ver en Google Maps</a>
          </div>
        </div>
      </div>
    </div>

    <div class="faq-seccion">
      <h2 class="seccion-titulo-accent">Preguntas Frecuentes</h2>
      
      <div class="faq-grid">
        <div class="faq-item">
          <h3 class="faq-pregunta">¿Tienen opciones sin gluten?</h3>
          <p class="faq-respuesta">
            Sí, ofrecemos una selección de panes y pasteles sin gluten elaborados en un área 
            separada para evitar la contaminación cruzada. Consulta nuestra sección especial 
            en la tienda.
          </p>
        </div>
        
        <div class="faq-item">
          <h3 class="faq-pregunta">¿Organizan talleres de panadería?</h3>
          <p class="faq-respuesta">
            Sí, regularmente organizamos talleres para principiantes y avanzados. Aprende a 
            hacer pan de masa madre, bollería o repostería. Consulta nuestro calendario de 
            eventos.
          </p>
        </div>
        
        <div class="faq-item">
          <h3 class="faq-pregunta">¿Tienen servicio a domicilio?</h3>
          <p class="faq-respuesta">
            Ofrecemos servicio a domicilio en toda la ciudad. Puedes hacer tu pedido por 
            teléfono o a través de nuestra página web con al menos 24 horas de anticipación.
          </p>
        </div>
        
        <div class="faq-item">
          <h3 class="faq-pregunta">¿Cuál es la especialidad de la casa?</h3>
          <p class="faq-respuesta">
            Nuestro pan de masa madre es nuestra especialidad, fermentado durante 24 horas 
            para desarrollar un sabor único y una miga perfecta. También son muy populares 
            nuestros croissants artesanales.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PanaderiaComponente',
  data() {
    return {
      formulario: {
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
      }
    };
  },
  methods: {
    enviarMensaje() {
      console.log('Formulario enviado:', this.formulario);
      
      this.formulario = {
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
      };

      alert('¡Gracias por tu mensaje! Te responderemos pronto.');
    }
  }
};
</script>

<style scoped>
.panaderia-container {
  font-family: 'Arial', sans-serif;
  width: 100%;
  margin: auto;
}

.banner {
  background-image: linear-gradient(rgba(146, 64, 14, 0.5), rgba(146, 64, 14, 0.5)),
    url('../assets/Fresh-bakery-goods-in-supermarket.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: 80px 20px;
}

.titulo {
  font-size: 42px;
  margin-bottom: 15px;
}

.subtitulo {
  font-size: 18px;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.5;
}

.contenido {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  background-color: #f9f7f2;
}

.info-contacto,
.formulario-contacto {
  flex: 1;
  min-width: 300px;
  padding: 20px;
  box-sizing: border-box;
}

.info-contacto {
  background-color: #fdf6e3;
  border-radius: 8px;
}

.formulario-contacto {
  background-color: white;
  border-radius: 8px;
}

.seccion-titulo {
  position: relative;
  color: #d35400;
  padding-bottom: 15px;
  margin-bottom: 30px;
  font-size: 24px;
}

.seccion-titulo::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 80px;
  height: 3px;
  background-color: #d35400;
}

.seccion-titulo-accent {
  position: relative;
  color: #b54400;
  padding-bottom: 10px;
  margin: 40px 0 30px 20px;
  font-size: 28px;
  display: inline-block;
}

.seccion-titulo-accent::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40px;
  height: 3px;
  background-color: #d35400;
}

.item-contacto {
  display: flex;
  margin-bottom: 30px;
}

.icono {
  width: 60px;
  height: 60px;
  background-color: #d35400;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: white;
  font-size: 20px;
}

.detalles h3 {
  color: #333;
  margin: 0 0 5px 0;
  font-size: 18px;
}

.detalles p {
  color: #666;
  margin: 2px 0;
  font-size: 16px;
}

/* .boton-container {
  margin-top: 20px;
} */

.boton-pedido {
  background-color: #d35400;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.3s;
}

.boton-pedido:hover {
  background-color: #a04000;
}

.fila-formulario {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.campo-formulario {
  flex: 1;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
}

input,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;
}

input:focus,
textarea:focus {
  border-color: #d35400;
  outline: none;
}

.boton-enviar {
  width: 100%;
  background-color: #d35400;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.boton-enviar:hover {
  background-color: #a04000;
}

/* Estilos para la sección de ubicación */
.ubicacion-seccion {
  padding: 20px;
  background-color: #fdf6e3;
}

.ubicacion-contenido {
  max-width: 1200px;
  margin: 0 auto;
}

.mapa-background {
  background-image: linear-gradient(rgba(146, 64, 14, 0.5), rgba(146, 64, 14, 0.5)),
    url('../assets/Fresh-bakery-goods-in-supermarket.jpg');
  background-size: cover;
  /* opacity: 70%; */
  background-position: center;
  height: 300px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mapa-overlay {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 25px;
  border-radius: 8px;
  text-align: center;
  max-width: 400px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.mapa-icono {
  width: 50px;
  height: 50px;
  background-color: #d35400;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  color: white;
  font-size: 18px;
}

.mapa-titulo {
  color: #333;
  margin: 0 0 10px 0;
  font-size: 22px;
}

.mapa-direccion {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
}

.boton-mapa {
  background-color: #d35400;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.boton-mapa:hover {
  background-color: #a04000;
}

.faq-seccion {
  padding: 20px;
  background-color: #fff;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.faq-item {
  background-color: #fdf6e3;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.faq-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.faq-pregunta {
  color: #d35400;
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 18px;
}

.faq-respuesta {
  color: #555;
  line-height: 1.6;
  margin: 0;
}

.footer {
  background-color: #8B4513;
  color: white;
  padding: 40px 20px 20px;
}

.footer-contenido {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 30px;
}

.footer-columna {
  flex: 1;
  min-width: 250px;
  margin-bottom: 20px;
  padding: 0 15px;
}

.footer-titulo {
  font-size: 18px;
  margin-top: 0;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 10px;
}

.footer-titulo::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50px;
  height: 2px;
  background-color: #FFA500;
}

.footer-descripcion {
  line-height: 1.6;
  margin-bottom: 20px;
}

.footer-social {
  display: flex;
  gap: 15px;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  transition: background-color 0.3s;
}

.social-icon:hover {
  background-color: #d35400;
}

.footer-info {
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-info i {
  width: 16px;
}

.footer-copyright {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .fila-formulario {
    flex-direction: column;
    gap: 0;
  }
  
  .info-contacto,
  .formulario-contacto {
    flex: 100%;
    margin-bottom: 20px;
  }
  
  .footer-contenido {
    flex-direction: column;
  }
  
  .faq-grid {
    grid-template-columns: 1fr;
  }
}
</style>