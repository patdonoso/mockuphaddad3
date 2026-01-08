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
CATÁLOGO DE PRODUCTOS
═══════════════════════════════════════════════════════════════════════════════

📦 BIDONES Y CONTENEDORES:
- Bidones Standard: 1L, 2L, 5L, 10L, 20L, 25L, 30L
- Bidones Económicos
- Bidones Boca Ancha
- Bidones con Ruedas
- Bidones Lecheros
- Bidones Pallet Apilable
- Bidones PET 5 litros
- Bidones y Tambores con Llave
- Bidones y Tambores Valvulados (con ventilación)

⛽ COMBUSTIBLES (CERTIFICADOS SEC):
- Bidones Certificados para Parafina/Kerosene (5L, 10L, 20L)
- Bidones Certificados para Petróleo/Diesel
- Bidones Certificados para Gasolina

🍶 ENVASES PET:
- Botellas PET para agua, jugos, leche
- Botellas para detergente (3L oval)
- Envases con sellos de seguridad
- Envases para aceites

🏭 INDUSTRIAL:
- Tambores 60L, 100L, 120L, 200L
- Baldes para uso industrial
- Barricas
- Estanques
- Fosas sépticas
- Bombas para extracción de líquidos
- Bolitas huecas antievaporantes (esferas plásticas)
- Barreras camineras tipo New Jersey

🌱 JARDINERÍA:
- Maceteros (varios tamaños y formas)
- Jardineras
- Regaderas
- Apliqués para colgar maceteros
- Bandejas cosecheras
- Bandejas para fruta

🏠 HOGAR:
- Basureros para reciclaje
- Bolsas para basura
- Bolsas para reciclaje
- Sillas plegables de plástico
- Muebles de terraza
- Bacinicas

🏥 SALUD Y FARMACIA:
- Artículos para enfermos (chatas, urinarios)
- Artículos de farmacia
- Envases para laboratorio
- Envases autoclavables para cultivo in vitro

🔬 LABORATORIO:
- Frascos para laboratorio
- Envases autoclavables
- Probetas y recipientes técnicos

🏕️ CAMPING:
- Termos
- Bidones portátiles
- Artículos para exterior

🚗 AUTOMÓVILES:
- Embudos
- Bidones para combustible
- Accesorios plásticos

🎁 PROMOCIÓN Y OTROS:
- Artículos promocionales
- Juguetes
- Peinetas y cepillos
- Artículos para dosificar

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
