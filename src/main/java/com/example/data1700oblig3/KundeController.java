package com.example.data1700oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class KundeController {
    @Autowired
    private KundeRepository rep;

    /*
    This method is mapped to the endpoint /lagreAlle and takes a Kunde object (customer object) as input.
    It uses the rep object to save the customer object to the database via the lagreAlleKunder method
    of the KundeRepository interface.
     */
    @PostMapping("/lagreAlle")
    public void lagreAlle(Kunde innKunde) {
        rep.lagreAlleKunder(innKunde);
    }

    /*
    return a list of all customer objects in the database using the rep object
    to access the hentAlleKunder method of the KundeRepository interface.
     */
    @GetMapping("/hentAlle")
    public List<Kunde> hentAlle() {
        return rep.hentAlleKunder();
    }
    //clears all customer objects from the database using the rep object to access the slettAlleKunder method

    @GetMapping("/slettAlle")
    public void slettAlle() {
        rep.slettAlleKunder();
    }
}

