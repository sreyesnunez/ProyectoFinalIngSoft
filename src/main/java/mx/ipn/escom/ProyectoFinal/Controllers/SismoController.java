package mx.ipn.escom.ProyectoFinal.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class SismoController {

    @GetMapping("/sismo/mapa")
    public String mostrarMapa(Model model) {
        model.addAttribute("title", "Mapa de Sismos");
        return "mapa"; // This refers to your mapa.html file in src/main/resources/templates
    }

    @PostMapping("/sismo/guardarSismo")
    public String guardarSismo(@RequestParam Double Latitud, // Match the 'name' attribute in your HTML
                               @RequestParam Double Longitud, // Match the 'name' attribute in your HTML
                               @RequestParam Integer Radio,    // Match the 'name' attribute in your HTML
                               Model model) {
        System.out.println("Latitud del sismo: " + Latitud);
        System.out.println("Longitud del sismo: " + Longitud);
        System.out.println("Radio del sismo: " + Radio);

        // Here you would typically:
        // 1. Validate the input data
        // 2. Create a Sismo entity/model object
        // 3. Save the data to your database using a service and repository

        model.addAttribute("message", "Información del sismo recibida: Latitud=" + Latitud + ", Longitud=" + Longitud + ", Radio=" + Radio);
        return "sismo-guardado"; // Create a sismo-guardado.html page or redirect
    }
    
}

