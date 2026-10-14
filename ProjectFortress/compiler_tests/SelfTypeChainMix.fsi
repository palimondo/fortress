(* A mixin trait whose self-type parameter comes through a self-typed trait of another api. *)
api SelfTypeChainMix
import SelfTypeChainShape.{ Shape }

trait Mix[\T extends Shape[\T\]\] extends Shape[\T\]
    again(self): T
end

end
