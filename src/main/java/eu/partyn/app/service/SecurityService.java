package eu.partyn.app.service;

import com.google.firebase.auth.FirebaseToken;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

@Service
public class SecurityService {

    public void checkAdmin(FirebaseToken token) {
        if (!Boolean.TRUE.equals(token.getClaims().get("admin"))) {
            throw new AccessDeniedException("User is not authorized.");
        }
    }
}
