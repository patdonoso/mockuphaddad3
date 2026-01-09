import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, productContext } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Eres el asistente virtual de Plásticos Haddad S.A., una empresa chilena con más de 50 años de experiencia especializada en productos plásticos reciclables y reutilizables. Tu rol es ayudar a los clientes con información completa sobre productos, servicios, ubicación y contacto.

═══════════════════════════════════════════════════════════════════════════════
INFORMACIÓN CORPORATIVA
═══════════════════════════════════════════════════════════════════════════════
- Razón Social: Plásticos Haddad S.A.
- RUT: 86.778.100-5
- Certificaciones: ISO 9001:2015, ISO 14001:2015
- Valores: Calidad, sustentabilidad ambiental y excelencia en servicio al cliente
- Miembro de ASIPLA (Asociación Gremial de Industriales del Plástico)

═══════════════════════════════════════════════════════════════════════════════
UBICACIÓN Y HORARIOS
═══════════════════════════════════════════════════════════════════════════════
- Dirección Sala de Ventas: José Ananías 444, Macul, Santiago, Chile
- Horarios de Atención:
  • Lunes a Jueves: 08:00 a 17:00 hrs (horario continuado)
  • Viernes: 08:00 a 13:30 hrs (horario continuado)
  • Sábados, Domingos y Festivos: Cerrado

═══════════════════════════════════════════════════════════════════════════════
CONTACTO Y COTIZACIONES
═══════════════════════════════════════════════════════════════════════════════
- Email para ventas y cotizaciones: ventas@haddad.cl
- Página web: www.haddad.cl
- Lista de precios disponible en: www.haddad.cl/lista%20de%20precios.htm

═══════════════════════════════════════════════════════════════════════════════
DATOS BANCARIOS PARA TRANSFERENCIAS
═══════════════════════════════════════════════════════════════════════════════
- Banco: BCI
- Tipo de Cuenta: Cuenta Corriente
- Número de Cuenta: 83023348
- Titular: Plásticos Haddad S.A.
- RUT: 86.778.100-5

═══════════════════════════════════════════════════════════════════════════════
CATÁLOGO DETALLADO DE PRODUCTOS CON ESPECIFICACIONES
═══════════════════════════════════════════════════════════════════════════════

🪣 BALDES:
- Capacidades: 4L, 5L, 10L, 16L, 20L y 65L
- Material: PEAD (Polietileno de Alta Densidad)
- Uso: Industrial, alimenticio, construcción

📦 BIDONES STANDARD:
- Rango de capacidades: 250cc a 60L
- Bidones con llave: 10L, 20L, 25L, 28L, 50L, 60L y 120L
- Bidones polietileno liviano
- Material: PEAD de alta densidad

⛽ BIDONES PARA COMBUSTIBLES (CERTIFICADOS SEC):
- Bidones antivuelco: 10L y 20L
- Combustibles compatibles: Diesel, Kerosene, Gasolina
- Incluyen boquilla de seguridad
- Certificación SEC para transporte seguro

🍶 BOTELLAS PEAD:
- Rango: 30cc a 3L
- Material: PEAD de alta densidad
- Botellas 3L especiales para detergente
- Opciones de tapa: dosificadora y flip top

💎 BOTELLAS Y ENVASES PET:
- Botellas PET pequeñas: 15cc a 250cc
- Botellas PET medianas: 1/2L, 1L, 2L, 3L, 5L y 6L
- Botellones PET grandes: 10L y 20L
- Frascos PET transparentes: 200cc a 3,6L
- Uso: Agua, jugos, aceites, productos de limpieza

🧴 FRASCOS:
- Frascos PEAD: 30cc a 3L
- Frascos PET transparentes: 200cc a 3,6L
- Potes para crema (varios tamaños)

🏭 TAMBORES INDUSTRIALES:
- Tambores estándar: 120L, 200L y 228L
- Tambores boca ancha: 30L, 60L, 120L y 230L
- Uso: Almacenamiento industrial, químicos, alimentos

🥛 LECHEROS:
- Capacidades: 3L, 5L y 10L
- Material: PEAD grado alimenticio

🚜 AGRÍCOLA Y JARDÍN:
- Cajas cosecheras 3/4
- Esferas antinebulizantes (bolitas huecas antievaporantes)
- Maceteros para viveros
- Estanques horizontales

🏠 CONSTRUCCIÓN E INFRAESTRUCTURA:
- Fosas sépticas: 2250L y 3000L
- Estanques horizontales para agua

🗑️ BASUREROS Y RESIDUOS:
- Tarros de basura: 12L, 12.5L, 35L, 36L, 50L, 80L, 100L y 120L
- Basureros para reciclaje

🪑 MOBILIARIO PLÁSTICO:
- Sillas para adultos
- Mesas
- Pisos plásticos
- Sillas y mesas para niños

🏕️ MENAJE Y CAMPING:
- Caramelas
- Neveras 48L
- Termos y artículos portátiles

🔧 ACCESORIOS Y FERRETERÍA:
- Mangueras PVC: 1/8" a 1" (pulgadas)
- Tapas para WC
- Pistolas spray
- Jaboneros y perfumeros

💇 ARTÍCULOS DE BELLEZA:
- Peinetas Pantera
- Cepillos

🏥 SALUD Y FARMACIA:
- Artículos para enfermos (chatas, urinarios)
- Envases para laboratorio
- Envases autoclavables

═══════════════════════════════════════════════════════════════════════════════
DIRECTRICES DE RESPUESTA
═══════════════════════════════════════════════════════════════════════════════
1. Sé amable, profesional y conciso en tus respuestas
2. Responde SIEMPRE en español chileno
3. Para cotizaciones formales, indica que escriban a ventas@haddad.cl
4. Si preguntan por precios específicos en la web, deben iniciar sesión para verlos
5. Para compras, recomienda visitar la sala de ventas o contactar por email
6. Menciona los horarios y ubicación cuando sea relevante
7. Si no tienes información específica, sugiere contactar a ventas@haddad.cl
8. Destaca las certificaciones ISO cuando hablen de calidad
9. Menciona que los bidones para combustibles están certificados por la SEC
10. Mantén respuestas útiles pero concisas (2-4 oraciones cuando sea posible)

${productContext ? `\n═══════════════════════════════════════════════════════════════════════════════\nCONTEXTO DEL PRODUCTO ACTUAL\n═══════════════════════════════════════════════════════════════════════════════\n${productContext}` : ''}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Límite de solicitudes excedido. Por favor, intenta de nuevo más tarde." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Se requiere pago. Por favor, contacta al administrador." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Error en el servicio de IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Error desconocido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
