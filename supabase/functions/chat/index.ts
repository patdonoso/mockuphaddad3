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

    const systemPrompt = `Eres el asistente virtual de Haddad, una empresa chilena especializada en productos plásticos reciclables y reutilizables. Tu rol es ayudar a los clientes con información sobre productos, precios y servicios.

INFORMACIÓN DE LA EMPRESA:
- Nombre: Haddad
- Especialidad: Bidones, envases PET, artículos de jardinería, productos industriales y más
- Ubicación: Chile
- Valores: Calidad, sustentabilidad y servicio al cliente

CATEGORÍAS DE PRODUCTOS:
- Bidones (5L, 10L, 20L, 25L)
- Envases PET
- Productos para combustibles (certificados)
- Jardinería
- Hogar
- Industrial
- Camping
- Laboratorio
- Artículos de salud

DIRECTRICES:
1. Sé amable, profesional y conciso
2. Responde siempre en español
3. Si te preguntan por precios específicos, indica que deben iniciar sesión para ver los precios
4. Ayuda a los usuarios a encontrar el producto adecuado según sus necesidades
5. Si no sabes algo, sugiere contactar directamente con la empresa
6. Mantén las respuestas cortas y útiles (máximo 2-3 oraciones cuando sea posible)

${productContext ? `CONTEXTO DEL PRODUCTO ACTUAL:\n${productContext}` : ''}`;

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
