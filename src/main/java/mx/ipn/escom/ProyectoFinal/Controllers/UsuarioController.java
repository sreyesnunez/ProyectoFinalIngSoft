package mx.ipn.escom.ProyectoFinal.Controllers;

import mx.ipn.escom.ProyectoFinal.models.Usuario;
import mx.ipn.escom.ProyectoFinal.repositories.UserRepository;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Optional;

@Controller
public class UsuarioController {

    private final UserRepository userRepository;

    public UsuarioController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/usuario")
    public String usuarioPerfil(@AuthenticationPrincipal User user, Model model) {
        Optional<Usuario> usuarioOptional = userRepository.findByEmail(user.getUsername());

        if (usuarioOptional.isPresent()) {
            model.addAttribute("usuario", usuarioOptional.get());
        } else {
            return "redirect:/login?error=user_not_found";
        }

        return "usuario";
    }
}
