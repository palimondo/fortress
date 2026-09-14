api MicroGPTRef
import List.{...}
ref_source_sha256: String
ref_uchars: String
ref_bos: ZZ32
ref_vocab_size: ZZ32
ref_n_embd: ZZ32
ref_n_head: ZZ32
ref_block_size: ZZ32
ref_num_steps_schedule: ZZ32
ref_learning_rate: RR64
ref_beta1: RR64
ref_beta2: RR64
ref_eps_adam: RR64
ref_num_steps: ZZ32
ref_temperature: RR64
ref_num_samples: ZZ32
ref_names(): List[\String\]
ref_docs_head(): List[\String\]
ref_init(name: String): List[\List[\RR64\]\]
ref_doc(step: ZZ32): String
ref_tokens(step: ZZ32): List[\ZZ32\]
ref_logits(step: ZZ32): List[\List[\RR64\]\]
ref_losses(step: ZZ32): List[\RR64\]
ref_loss(step: ZZ32): RR64
ref_lr(step: ZZ32): RR64
ref_grad0(name: String): List[\List[\RR64\]\]
ref_after0(name: String): List[\List[\RR64\]\]
ref_grad1(name: String): List[\List[\RR64\]\]
ref_after1(name: String): List[\List[\RR64\]\]
ref_grad(step: ZZ32, name: String): List[\List[\RR64\]\]
ref_after(step: ZZ32, name: String): List[\List[\RR64\]\]
ref_sample_text(s: ZZ32): String
ref_sample_tokens(s: ZZ32): List[\ZZ32\]
ref_sample_draws(s: ZZ32): List[\RR64\]
ref_sample_probs(s: ZZ32): List[\List[\RR64\]\]
end
