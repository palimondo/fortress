(* A mixin of a mixin trait of another api, which does not import the self-typed trait under both. *)
api SelfTypeChainMixOfMix
import SelfTypeChainMix.{ Mix }

trait MixOfMix[\T extends Mix[\T\]\] extends Mix[\T\]
    again2(self): T
end

end
